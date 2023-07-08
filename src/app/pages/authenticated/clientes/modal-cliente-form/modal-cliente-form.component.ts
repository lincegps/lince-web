import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../../models/cliente.model';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-modal-cliente-form',
  templateUrl: './modal-cliente-form.component.html',
  styleUrls: ['./modal-cliente-form.component.css'],
})
export class ModalClienteFormComponent implements OnInit {
  cliente = new ClienteDTO();
  telefones = [
    {
      telefone: '',
    },
  ];

  emails = [
    {
      email: '',
    },
  ];

  constructor(
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _clientesService: ClientesService,
    private _sweetAlertaService: SweetalertService
  ) {}

  ngOnInit(): void {
    this.loadCliente();
  }

  loadCliente(): void {
    const id = Number(this._config.data.id);
    if (id) {
      this._clientesService.obterCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
        this.telefones = this.cliente.telefones.map((t) => ({
          telefone: t,
        }));
        this.emails = this.cliente.emails.map((e) => ({
          email: e,
        }));
      });
    }
  }

  onSubmit(): void {
    const isNovo = this.cliente.id === undefined;
    this.cliente.telefones = this.telefones
      .filter((t) => t.telefone && t.telefone.trim().length > 0)
      .map((t) => t.telefone.trim());
    this.cliente.emails = this.emails
      .filter((e) => e.email && e.email.trim().length > 0)
      .map((e) => e.email.trim());
    this._clientesService.saveOrUpdate(this.cliente).subscribe((cliente) => {
      if (this.cliente.id === undefined) {
        this.cliente.id = cliente.id;
      }
      this._sweetAlertaService.notificarSucesso(
        `Cliente ${isNovo ? 'salvo' : 'atualizado '} com sucesso!`
      );
      this._ref.close(this.cliente);
    });
  }

  adicionarTelefone() {
    this.cliente.telefones.push('');
  }
}
