import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertResult } from 'sweetalert2';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Movimentacao } from '../../../models/movimentacao.model';
import { MovimentacaoService } from '../../../shared/services/movimentacao.service';
import { TipoMovimnetacao } from '../../../models/enums/tipo-movimentacao.enum';
import { ModalFormMovimentacaoComponent } from './modal-form-movimentacao/modal-form-movimentacao.component';
import { Pageable } from '../../../models/pageable.model';
import { MovimentacaoFiltro } from '../../../models/filtro-movimentacao.model';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { PontoVendaService } from '../ponto-venda/ponto-venda.service';
import { TipoPontoVendaEnum } from '../../../models/enums/tipo-ponto-venda.enum';
import { PontoVenda } from '../../../models/ponto-venda.model';
import { CalendarUtil } from '../../../shared/utils/calendar.util';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService],
})
export class EstoqueComponent implements OnInit {
  movimentaoes: Movimentacao[] = [];
  tipoMovimentacao = TipoMovimnetacao;

  filtro = new MovimentacaoFiltro();
  options: SelectItem[];
  produtos: SelectItem[];
  pontosVendas: SelectItem[] = [];

  pt = CalendarUtil.getLanguagePtCalendar();
  totalRegistros: number;

  constructor(
    private _dialogService: DialogService,
    private _movimentacaoService: MovimentacaoService,
    private _pontosVendasService: PontoVendaService,
    private _sweetAlertaService: SweetalertService,
    private _spinner: NgxSpinnerService
  ) {
    this.options = [
      { label: 'Entrada', value: 'ENTRADA' },
      { label: 'Saída', value: 'SAIDA' },
    ];
    this.produtos = [
      { label: 'Aparelho', value: 'APARELHO' },
      { label: 'Assinatura', value: 'ASSINATURA' },
    ];
  }

  ngOnInit(): void {
    this.pesquisar();
    this.obterPontosDeVenda();
  }

  pesquisar(pagina = 0): void {
    this._spinner.show();
    this.filtro.pagina = pagina;
    this._movimentacaoService
      .obterTodas(this.filtro)
      .subscribe(
        (pageable: Pageable<Movimentacao>) => {
          this.totalRegistros = pageable.totalElements;
          this.movimentaoes = pageable.content;
          this.movimentaoes.sort(
            (m1, m2) =>
              new Date(m1.data).getTime() - new Date(m2.data).getTime()
          );
        },
        (err) =>
          this._sweetAlertaService.notificarError(
            'Erro ao obter listagem de movimentações no estoque',
            null,
            err
          )
      )
      .add(() => this._spinner.hide());
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  limparFiltro(): void {
    this.filtro = new MovimentacaoFiltro();
    this.pesquisar();
  }

  openModalMovimentacao(tipoMovimentacao: TipoMovimnetacao, id?: number): void {
    const dialogRef = this._dialogService.open(ModalFormMovimentacaoComponent, {
      header: `${
        tipoMovimentacao === TipoMovimnetacao.ENTRADA
          ? 'Entrada no estoque'
          : 'Saída do estoque'
      }`,
      width: '50%',
      data: {
        tipoMovimentacao,
        id,
      },
    });
    this.listemOncloseDialogRef(dialogRef);
  }

  listemOncloseDialogRef(dialogRef: DynamicDialogRef): void {
    dialogRef.onClose.subscribe((movimentacao: Movimentacao) => {
      if (this.movimentaoes.some((m) => m.id === movimentacao.id)) {
        this.movimentaoes = this.movimentaoes.map((m) => {
          if (m.id === movimentacao.id) {
            return movimentacao;
          }
          return m;
        });
      } else {
        if (this.movimentaoes.length === 7) {
          this.totalRegistros = this.totalRegistros + 1;
        } else {
          this.movimentaoes.push(movimentacao);
        }
      }
    });
  }

  confirmDelete(id: number) {
    this._sweetAlertaService
      .confirmDialog('Tem certeza que deseja deletar a movimentação?', '')
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this._spinner.show();
          this.deletarMovimentacao(id);
        }
      });
  }

  deletarMovimentacao(id: number) {
    this._movimentacaoService
      .deletar(id)
      .subscribe(
        () => {
          this.movimentaoes = this.movimentaoes.filter((m) => m.id !== id);
        },
        (erro: HttpErrorResponse) => {
          this._sweetAlertaService.notificarError(
            'Erro ao tentar excluir movimentação',
            null,
            erro
          );
        }
      )
      .add(() => this._spinner.hide());
  }

  private obterPontosDeVenda(): void {
    this._pontosVendasService
      .obterPontoVendas()
      .subscribe((pontoVendas: PontoVenda[]) => {
        this.pontosVendas = pontoVendas.map((pv) => ({
          label: pv.nome,
          value: pv.id,
        }));
      });
  }
}
