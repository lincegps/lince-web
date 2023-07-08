import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClienteFIltro } from '../../../../models/cliente-filtro.model';

@Component({
  selector: 'app-cliente-filtro',
  templateUrl: './cliente-filtro.component.html',
  styleUrls: ['./cliente-filtro.component.css'],
})
export class ClienteFiltroComponent implements OnInit {
  filtro = new ClienteFIltro();

  @Output() filtroEvent = new EventEmitter<ClienteFIltro>();

  constructor() {}

  ngOnInit(): void {
    this.filtroEvent.emit(this.filtro);
  }

  pesquisar() {
    this.filtro.pagina = 0;
    this.filtroEvent.emit(this.filtro);
  }

  limparFiltro() {
    this.filtro.pagina = 0;
    this.filtroEvent.emit(new ClienteFIltro());
  }
}
