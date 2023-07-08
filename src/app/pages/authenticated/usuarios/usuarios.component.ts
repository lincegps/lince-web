import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { ModalUsuarioFormComponent } from './modal-usuario-form/modal-usuario-form.component';
import { SweetalertService } from '../../../shared/services/sweetalert.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [DialogService],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private _usuariosService: UsuariosService,
    private _dialogService: DialogService,
    private _spinner: NgxSpinnerService,
    private _sweetAlertService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.loadAllUsuarios();
  }

  loadAllUsuarios(): void {
    this._spinner.show();
    this._usuariosService
      .obterTodos()
      .subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        },
        (err) =>
          this._sweetAlertService.notificarError(
            'Erro ao buscar usuários',
            null,
            err
          )
      )
      .add(() => this._spinner.hide());
  }

  alterarStatus(usuario: Usuario): void {
    const status = usuario.ativo ? 'DESATIVAR' : 'ATIVAR';
    this._usuariosService
      .alterarStatus(Number(usuario.id), status)
      .subscribe(() => {
        this.usuarios = this.usuarios.map((u) => ({
          ...u,
          ativo: u.id === usuario.id ? !u.ativo : u.ativo,
        }));
      });
  }

  openModalUsuarioForm() {
    const dialogRef = this._dialogService.open(ModalUsuarioFormComponent, {
      header: 'Cadastro de usuário',
      width: '30%',
    });
    this.listenOnClosedDialog(dialogRef);
  }

  private listenOnClosedDialog(dialogRef: DynamicDialogRef) {
    dialogRef.onClose.subscribe((usuario: Usuario) => {
      if (usuario) {
        this.usuarios.push(usuario);
      }
    });
  }
}
