import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnInit } from '@angular/core';
import { ContatoPosVendaFormComponent } from './contato-pos-venda-form/contato-pos-venda-form.component';
import { Contato } from '../../../models/contato.model';
import { ContatoService } from './contato.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';
import { AppUtil } from '../../../shared/utils/app.util';
import { SweetAlertResult } from 'sweetalert2';

export interface DataDialogRefClosed<T> {
  objeto: T;
  insert: boolean;
}

@Component({
  selector: 'app-contato-pos-venda',
  templateUrl: './contato-pos-venda.component.html',
  styleUrls: ['./contato-pos-venda.component.css'],
  providers: [DialogService],
})
export class ContatoPosVendaComponent implements OnInit {
  contatos: Contato[] = [];

  constructor(
    private _dialogService: DialogService,
    private _contatoService: ContatoService,
    private _sweetAlertaService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this._contatoService.findAll().subscribe(
      (contatos) => {
        this.contatos = contatos;
      },
      (erro) =>
        this._sweetAlertaService.notificarError(
          'Erro ao obter contatos',
          null,
          erro
        )
    );
  }

  confirmDelete(id: number) {
    this._sweetAlertaService
      .confirmDialog('Tem certeza que deseja excluir o contato?', null)
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this._contatoService.delete(id).subscribe(
            () => {
              this.contatos = this.contatos.filter((c) => c.id !== id);
              this._sweetAlertaService.notificarSucesso(
                'Contato excluido com sucesso!'
              );
            },
            (erro) =>
              this._sweetAlertaService.notificarError(
                'Erro ao tentar excluir contato!',
                null,
                erro
              )
          );
        }
      });
  }

  openContatoPosVendaForm(idContato?: number) {
    const dialogRef = this._dialogService.open(ContatoPosVendaFormComponent, {
      header: 'Contato pós venda',
      width: '50%',
      data: {
        idContato,
      },
    });
    this.listemDialog(dialogRef);
  }

  listemDialog(dialogRef: DynamicDialogRef) {
    dialogRef.onClose.subscribe(
      (dataDialogRefClosed: DataDialogRefClosed<Contato>) => {
        if (dataDialogRefClosed) {
          if (dataDialogRefClosed.insert) {
            this.contatos.push(dataDialogRefClosed.objeto);
          } else {
            this.contatos = this.contatos.map((c) => {
              if (c.id === dataDialogRefClosed.objeto.id) {
                return dataDialogRefClosed.objeto;
              }
              return c;
            });
          }
        }
      }
    );
  }

  obterTipoContato(tipoContato: String): string {
    return AppUtil.tiposDeContatos().find(
      (tContato) => tContato.value === tipoContato
    )?.label;
  }
}
