import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Venda } from '../../../../models/venda.model';

@Component({
  selector: 'app-venda-detalhe',
  templateUrl: './venda-detalhe.component.html',
  styleUrls: ['./venda-detalhe.component.css'],
})
export class VendaDetalheComponent implements OnInit {
  venda: Venda;

  constructor(
    private _dialogConfig: DynamicDialogConfig,
    private _dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.venda = this._dialogConfig.data.venda;
  }

  fechar() {
    this._dialogRef.close();
  }
}
