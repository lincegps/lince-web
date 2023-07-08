import { NgxSpinnerService } from 'ngx-spinner';
import { SweetalertService } from './../../../shared/services/sweetalert.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PontoVenda } from './../../../models/ponto-venda.model';
import { PontoVendaService } from './ponto-venda.service';
import { ModalPontovendaFormComponent } from './modal-pontovenda-form/modal-pontovenda-form.component';
import { TipoPontoVendaEnum } from '../../../models/enums/tipo-ponto-venda.enum';

@Component({
  selector: 'app-ponto-venda',
  templateUrl: './ponto-venda.component.html',
  styleUrls: ['./ponto-venda.component.css'],
  providers: [DialogService, ConfirmationService],
})
export class PontoVendaComponent implements OnInit {
  pontovendas: PontoVenda[] = [];
  selectedPontovendas: PontoVenda[] = [];

  constructor(
    private _pontovendaService: PontoVendaService,
    private _dialogService: DialogService,
    private _sweetAlertService: SweetalertService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.obterPontoVendas();
  }

  obterPontoVendas(): void {
    this._spinner.show();
    this._pontovendaService
      .obterPontoVendas()
      .subscribe(
        (pontovendas: PontoVenda[]) => {
          this.pontovendas = pontovendas.filter(
            (pv) => pv.tipo === TipoPontoVendaEnum.MINI_MERCADO
          );
        },
        (err) =>
          this._sweetAlertService.notificarError(
            'Erro ao buscar pontos de venda',
            null,
            err
          )
      )
      .add(() => this._spinner.hide());
  }

  openModalPontovendaForm(id?: number): void {
    const header =
      id === undefined ? 'Incluir Ponto de Venda' : 'Alterar Ponto de Venda';
    const dialogRef = this._dialogService.open(ModalPontovendaFormComponent, {
      header,
      width: '50%',
      data: {
        id,
      },
    });
    this.listemDialogRef(dialogRef);
  }

  async confirmDelete(id: number): Promise<void> {
    const { isConfirmed } = await this._sweetAlertService.confirmDialog(
      'Tem certeza que deseja excluir o ponto de venda?',
      ''
    );
    if (isConfirmed) {
      this.deletePontoVenda(id);
    }
  }

  private listemDialogRef(dialogRef: DynamicDialogRef): void {
    dialogRef.onClose.subscribe((pontovendaSalvo: PontoVenda) => {
      if (pontovendaSalvo) {
        const pontovendaExistente = this.pontovendas.some(
          (pontovenda) => pontovenda.id === pontovendaSalvo.id
        );
        if (pontovendaExistente) {
          this.pontovendas = this.pontovendas.map((pontovenda) => {
            if (pontovendaSalvo.id === pontovenda.id) {
              return pontovendaSalvo;
            } else {
              return pontovenda;
            }
          });
        } else {
          this.pontovendas.push(pontovendaSalvo);
        }
      }
    });
  }

  private deletePontoVenda(id: number): void {
    this._pontovendaService.deletar(id).subscribe(() => {
      this._sweetAlertService.notificarSucesso(
        'Ponto de Venda excluido com sucesso'
      );
      this.pontovendas = this.pontovendas.filter((p) => p.id !== id);
    });
  }
}
