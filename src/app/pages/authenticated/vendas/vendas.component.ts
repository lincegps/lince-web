import { NgxSpinnerService } from 'ngx-spinner';
import { StatusVenda } from './../../../models/enums/status-venda.enum';
import { SweetAlertResult } from 'sweetalert2';
import { SweetalertService } from './../../../shared/services/sweetalert.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Builder } from 'builder-pattern';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipoProduto } from '../../../models/enums/tipo-produto.model';
import { PontoVenda } from '../../../models/ponto-venda.model';
import { Produto } from '../../../models/produto.model';
import { Venda } from '../../../models/venda.model';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { VendasService } from './vendas.service';
import { Pageable } from '../../../models/pageable.model';
import { VendaFiltro } from '../../../models/filtro-venda.model';
import * as xlsx from 'xlsx';
import { AppUtil } from '../../../shared/utils/app.util';
import { DatePipe } from '@angular/common';
import { ContatoPosVendaFormComponent } from '../contato-pos-venda/contato-pos-venda-form/contato-pos-venda-form.component';
import { LazyLoadEvent } from 'primeng/api';
import { VendaDetalheComponent } from './venda-detalhe/venda-detalhe.component';
@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css'],
})
export class VendasComponent implements OnInit {
  vendas: Venda[] = [];
  totalRegistros = 0;
  tipoProduto = TipoProduto;

  status = StatusVenda;
  realizandoDownload: boolean;
  filtro = new VendaFiltro();

  constructor(
    private _dialogService: DialogService,
    private _vendaService: VendasService,
    private _sweetAlertaService: SweetalertService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  filtrar(filtro: VendaFiltro) {
    this.filtro = filtro;
    this.pesquisar();
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;
    this._spinner.show();
    this._vendaService
      .pesquisar(this.filtro)
      .subscribe(
        (pageable: Pageable<Venda>) => {
          this.vendas = pageable.content;
          this.totalRegistros = pageable.totalElements;
        },
        (err) =>
          this._sweetAlertaService.notificarError(
            'Erro ao pesquisar vendas',
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

  openDialogVendaForm(idVenda?: number): void {
    const dialofRef = this._dialogService.open(VendaFormComponent, {
      header: 'Nova venda',
      width: '80%',
      data: {
        idVenda,
      },
      closable: false,
    });

    this.listenOnCloseDialog(dialofRef);
  }

  onConfirmDelete(idVenda: number) {
    this._sweetAlertaService
      .confirmDialog('Tem certeza que deseja cancelar a venda?', null)
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this._spinner.show();
          this.handleDeletar(idVenda);
        }
      });
  }

  handleDeletar(idVenda: number) {
    this._vendaService
      .cancelar(idVenda)
      .subscribe(
        () => {
          this.vendas = this.vendas.filter((v) => v.id !== idVenda);
          this._sweetAlertaService.notificarSucesso(
            'Venda excluida com sucesso!'
          );
        },
        (err) =>
          this._sweetAlertaService.notificarError(
            'Erro ao excluir venda',
            null,
            err
          )
      )
      .add(() => this._spinner.hide());
  }

  exportToExcel() {
    this.realizandoDownload = true;
    this._vendaService
      .exportar(this.filtro)
      .subscribe((data: any) => {
        AppUtil.downLoadFile(
          data,
          AppUtil.FORMATO_XLS,
          this.montaNomeArquivo()
        );
      })
      .add(() => {
        this.realizandoDownload = false;
      });
  }

  openContatoPosVendaForm(numeroSerie: number) {
    this._dialogService.open(ContatoPosVendaFormComponent, {
      header: 'Contato pós venda',
      width: '50%',
      data: {
        numeroSerie,
      },
    });
  }

  openVendaDetalhe(venda: Venda) {
    this._dialogService.open(VendaDetalheComponent, {
      width: '50%',
      header: `Detalhes da venda ${venda.numeroSerie}`,
      data: {
        venda,
      },
    });
  }

  private montaNomeArquivo(): string {
    const datePipe = new DatePipe('pt-BR');
    return `relatorio_vendas_data_${datePipe.transform(
      new Date(),
      'dd/MM/yyyy HH:mm:ss'
    )}`;
  }

  private listenOnCloseDialog(dialofRef: DynamicDialogRef): void {
    dialofRef.onClose.subscribe(({ venda, update }) => {
      if (venda) {
        if (update) {
          this.vendas = this.vendas.map((v) => {
            if (v.id === venda.id) {
              return venda;
            }
            return v;
          });
        } else {
          this.vendas.unshift(venda);
        }
      }
    });
  }
}
