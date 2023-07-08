import { VendaFiltro } from './../../../../models/filtro-venda.model';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-venda-detalhe-modal',
  templateUrl: './venda-detalhe-modal.component.html',
  styleUrls: ['./venda-detalhe-modal.component.css'],
})
export class VendaDetalheModalComponent implements OnInit {
  filtro: VendaFiltro;

  constructor(private _dialogConfig: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.filtro = Object.assign(
      new VendaFiltro(),
      this._dialogConfig.data.filtro
    );
  }
}
