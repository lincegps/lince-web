import { SweetalertService } from './../../../../shared/services/sweetalert.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from './../usuarios.service';
import { Usuario } from './../../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-usuario-form',
  templateUrl: './modal-usuario-form.component.html',
  styleUrls: ['./modal-usuario-form.component.css'],
})
export class ModalUsuarioFormComponent implements OnInit {
  usuario = new Usuario();

  constructor(
    private _ref: DynamicDialogRef,
    private _usuarioService: UsuariosService,
    private _sweetAlertaService: SweetalertService,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this._spinner.show();
    this._usuarioService
      .criar(this.usuario)
      .subscribe(
        (usuario: Usuario) => {
          this._sweetAlertaService.notificarSucesso(
            'Usuário salvo com sucesso'
          );
          this._ref.close(usuario);
        },
        (err) => {
          this._sweetAlertaService.notificarError(
            'Erro ao salvar usuário',
            null,
            err
          );
        }
      )
      .add(() => {
        this._spinner.hide();
        this._ref.close();
      });
  }
}
