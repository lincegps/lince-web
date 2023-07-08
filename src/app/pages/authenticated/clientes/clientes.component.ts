import { SweetalertService } from './../../../shared/services/sweetalert.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../models/cliente.model';
import { ClientesService } from './clientes.service';
import { ModalClienteFormComponent } from './modal-cliente-form/modal-cliente-form.component';
import { ClienteFIltro } from '../../../models/cliente-filtro.model';
import { Pageable } from '../../../models/pageable.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [DialogService, ConfirmationService],
})
export class ClientesComponent implements OnInit {
  clientes: ClienteDTO[] = [];
  totalRegistros = 0;
  selectedClientes: ClienteDTO[] = [];
  filtro: ClienteFIltro;

  constructor(
    private _clientesService: ClientesService,
    private _dialogService: DialogService,
    private _sweetAlertaService: SweetalertService
  ) {}

  ngOnInit(): void {}

  pesquisar(filtro: ClienteFIltro) {
    this.filtro = filtro;
    this._clientesService
      .pesquisar(filtro)
      .subscribe((pageable: Pageable<ClienteDTO>) => {
        this.clientes = pageable.content;
        this.totalRegistros = pageable.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.filtro.pagina = pagina;
    this.pesquisar(this.filtro);
  }

  openModalClienteForm(id?: number): void {
    const header = id === undefined ? 'Incluir cliente' : 'Alterar cliente';
    const dialogRef = this._dialogService.open(ModalClienteFormComponent, {
      header,
      width: '50%',
      data: {
        id,
      },
      baseZIndex: 1038,
    });

    this.listemDialogRef(dialogRef);
  }

  async confirmDelete(id: number): Promise<void> {
    const message =
      this.selectedClientes.length > 1
        ? 'Tem certeza de que deseja excluir os produtos selecionados?'
        : ' Tem certeza de que deseja excluir o produto selecionado?';

    const { isConfirmed } = await this._sweetAlertaService.confirmDialog(
      message,
      ''
    );
    if (isConfirmed) {
      this.deleteCliente(id);
    }
  }

  private listemDialogRef(dialogRef: DynamicDialogRef): void {
    dialogRef.onClose.subscribe((clienteSalvo: ClienteDTO) => {
      if (clienteSalvo) {
        const clienteExistente = this.clientes.some(
          (cliente) => cliente.id === clienteSalvo.id
        );
        if (clienteExistente) {
          this.clientes = this.clientes.map((cliente) => {
            if (clienteSalvo.id === cliente.id) {
              return clienteSalvo;
            } else {
              return cliente;
            }
          });
        } else {
          this.clientes = [...this.clientes, clienteSalvo];
        }
      }
    });
  }

  private deleteCliente(id: number): void {
    this._clientesService.deletar(id).subscribe(() => {
      this._sweetAlertaService.notificarSucesso('Cliente excluido com sucesso');
      this.clientes = this.clientes.filter((c) => c.id !== id);
    });
  }
}
