import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DashboardProdutos } from '../../../models/dashboard-produto.model';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalDetalheEstoquePontosVendaComponent } from './modal-detalhe-estoque-pontos-venda/modal-detalhe-estoque-pontos-venda.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
