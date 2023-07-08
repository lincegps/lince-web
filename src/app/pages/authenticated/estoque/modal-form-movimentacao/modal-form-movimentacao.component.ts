import { CalendarUtil } from './../../../../shared/utils/calendar.util';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Builder } from 'builder-pattern';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TipoMovimnetacao } from '../../../../models/enums/tipo-movimentacao.enum';
import { TipoPontoVendaEnum } from '../../../../models/enums/tipo-ponto-venda.enum';
import { Movimentacao } from '../../../../models/movimentacao.model';
import { PontoVenda } from '../../../../models/ponto-venda.model';
import { MovimentacaoService } from '../../../../shared/services/movimentacao.service';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';
import { EstoqueService } from '../estoque.service';
import { PontoVendaService } from '../../ponto-venda/ponto-venda.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-form-movimentacao.component.html',
  styleUrls: ['./modal-form-movimentacao.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalFormMovimentacaoComponent implements OnInit {
  movimentacao = new Movimentacao();
  produtoSelecionado: string;
  maxDateValue = new Date();

  pontosVendasOrigemInitialState: PontoVenda[] = [];
  pontosVendasOrigem: PontoVenda[] = [];
  pontosVendasOrigemFiltrados: PontoVenda[] = [];

  pontosVendasDestinoInitialState: PontoVenda[] = [];
  pontosVendasDestino: PontoVenda[] = [];
  pontosVendasDestinoFiltrados: PontoVenda[] = [];

  debounce = new Subject<number>();
  loadingInputQuantidade = false;
  exibirAlertaQtdDigitada = false;

  pt = CalendarUtil.getLanguagePtCalendar();

  constructor(
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _movimentacaoService: MovimentacaoService,
    private _sweetAlertaService: SweetalertService,
    private _estoqueService: EstoqueService,
    private _pontosVendasService: PontoVendaService
  ) {}

  ngOnInit(): void {
    this.movimentacao.tipoMovimentacao = this._config.data.tipoMovimentacao;
    this.obterPontosDeVenda();
    this.listemInputQuantidade();
    const id = this._config.data.id;
    if (id) {
      this.obterMovimentacao(id);
    }
  }

  listemInputQuantidade(): void {
    this.debounce
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe(async (value: number) => {
        if (
          value &&
          this.movimentacao.pontoVendaDTOOrigem.tipo !==
            TipoPontoVendaEnum.FABRICANTE
        ) {
          this.exibirAlertaQtdDigitada = false;
          this.loadingInputQuantidade = true;
          const quantidadeDigitada = Number(value);
          const quantidadeEmEstoque = await this._estoqueService.obterQtdEstoqueProduto(
            this.movimentacao.pontoVendaDTOOrigem.id,
            this.movimentacao.idProduto
          );
          if (quantidadeDigitada > quantidadeEmEstoque) {
            this.exibirAlertaQtdDigitada = true;
          }
          this.loadingInputQuantidade = false;
        }
      });
  }

  selecionaProduto(produto: string): void {
    this.produtoSelecionado = produto;
    this.movimentacao = Builder(Movimentacao)
      .idProduto(this.produtoSelecionado === 'APARELHO' ? 1 : 2)
      .tipoMovimentacao(this._config?.data?.tipoMovimentacao)
      .pontoVendaDTOOrigem(this.movimentacao?.pontoVendaDTOOrigem)
      .pontoVendaDTODestino(this.movimentacao?.pontoVendaDTODestino)
      .build();
    this.exibirAlertaQtdDigitada = false;
  }

  adicionar(): void {
    this._movimentacaoService.criar(this.movimentacao).subscribe(
      (movimentacoes: Movimentacao[]) => {
        this._sweetAlertaService.notificarSucesso(
          'Movimentação adicinada com sucesso!'
        );
        this._ref.close(movimentacoes);
      },
      (err) => {
        if (err.status === 400) {
          this._sweetAlertaService.notificarError(
            'Falha ao tentar salvar!',
            `${err.detail}`,
            err
          );
        } else {
          this._sweetAlertaService.notificarError(
            'Erro ao salvar movimentacao!',
            null,
            err
          );
        }
      }
    );
  }

  alterar(id: number) {
    this._movimentacaoService.update(id, this.movimentacao).subscribe(
      (movimentacao: Movimentacao) => {
        this._sweetAlertaService.notificarSucesso(
          'Movimentação alterada com sucesso!'
        );
        this._ref.close(movimentacao);
      },
      (err) => {
        this._sweetAlertaService.notificarError(
          'Erro ao alterar movimentacao!',
          null,
          err
        );
      }
    );
  }

  filterAutoComplete(
    { query }: any,
    pontosVendas: PontoVenda[],
    isOrigem = true
  ): void {
    const filtered: PontoVenda[] = [];
    for (const pontoVenda of pontosVendas) {
      if (pontoVenda?.nome.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(pontoVenda);
      }
    }
    if (isOrigem) {
      this.pontosVendasOrigemFiltrados = filtered;
    } else {
      this.pontosVendasDestinoFiltrados = filtered;
    }
  }

  filterArrayDestino(pontoVenda: PontoVenda): void {
    this.pontosVendasDestino = this.pontosVendasDestinoInitialState;
    this.pontosVendasDestino = this.pontosVendasDestino.filter(
      (pv) => pv.id !== pontoVenda.id
    );
  }

  private obterMovimentacao(id: number) {
    this._movimentacaoService.find(id).subscribe(
      (movimentacao: Movimentacao) => {
        this.movimentacao = movimentacao;
        this.produtoSelecionado = this.movimentacao.tipoProduto;
        this.movimentacao.data = new Date(movimentacao.data);
        this.listemInputQuantidade();
      },
      (erro) => {
        this._sweetAlertaService.notificarError(
          'Erro ao obter movimentação',
          null,
          erro
        );
        this._ref.close();
      }
    );
  }

  private obterPontosDeVenda(): void {
    this._pontosVendasService
      .obterPontoVendas()
      .subscribe((pontoVendas: PontoVenda[]) => {
        if (this.movimentacao.tipoMovimentacao === TipoMovimnetacao.ENTRADA) {
          this.pontosVendasOrigem = pontoVendas.filter(
            (pv: PontoVenda) => pv.tipo === TipoPontoVendaEnum.FABRICANTE
          );
          this.movimentacao.pontoVendaDTOOrigem = this.pontosVendasOrigem[0];
          this.pontosVendasDestino = pontoVendas.filter(
            (pv: PontoVenda) =>
              pv.tipo === TipoPontoVendaEnum.CENTRO_DISTRIBUICAO
          );
          this.movimentacao.pontoVendaDTODestino = this.pontosVendasDestino[0];
        } else {
          this.pontosVendasOrigem = pontoVendas.filter(
            (pv: PontoVenda) => pv.tipo !== TipoPontoVendaEnum.FABRICANTE
          );
          this.pontosVendasDestino = pontoVendas.filter(
            (pv: PontoVenda) => pv.tipo !== TipoPontoVendaEnum.FABRICANTE
          );
        }

        this.pontosVendasOrigemInitialState = this.pontosVendasOrigem;
        this.pontosVendasDestinoInitialState = this.pontosVendasDestino;
      });
  }
}
