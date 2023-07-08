import { HttpErrorResponse } from '@angular/common/http';
import { PontoVendaService } from './../ponto-venda.service';
import { PontoVenda } from './../../../../models/ponto-venda.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';

@Component({
  selector: 'app-modal-pontovenda-form',
  templateUrl: './modal-pontovenda-form.component.html',
  styleUrls: ['./modal-pontovenda-form.component.css'],
})
export class ModalPontovendaFormComponent implements OnInit {
  pontovenda = new PontoVenda();
  constructor(
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _pontovendaService: PontoVendaService,
    private _sweetAlertaService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.loadPontoVenda();
  }

  loadPontoVenda(): void {
    const id = Number(this._config.data.id);
    if (id) {
      this._pontovendaService
        .obterPontoVenda(id)
        .subscribe((pontovenda) => (this.pontovenda = pontovenda));
    }
  }

  onSubmit(): void {
    const isNovo = this.pontovenda.id === undefined;
    this._pontovendaService.saveOrUpdate(this.pontovenda).subscribe(
      (pontovenda: PontoVenda) => {
        this._sweetAlertaService.notificarSucesso(
          `Ponto de venda ${isNovo ? 'salvo' : 'atualizado '} com sucesso!`
        );
        this._ref.close(pontovenda);
      },
      (httpErro: HttpErrorResponse) =>
        this._sweetAlertaService.notificarError(
          `Erro ao ${isNovo ? 'salvar' : 'atualizado '} ponto de venda`,
          null,
          httpErro
        )
    );
  }
}
