import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DashboardProdutos } from '../../../../models/dashboard-produto.model';
import { DashboardService } from '../dashboard.service';
import { ModalDetalheEstoquePontosVendaComponent } from '../modal-detalhe-estoque-pontos-venda/modal-detalhe-estoque-pontos-venda.component';

@Component({
  selector: 'app-relatorio-produtos',
  templateUrl: './relatorio-produtos.component.html',
  styleUrls: ['./relatorio-produtos.component.css'],
  providers: [DialogService],
})
export class RelatorioProdutosComponent implements OnInit {
  dashboardProdutos: DashboardProdutos;
  loading = false;

  constructor(
    private _dashboardService: DashboardService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.obterDadosEstoque();
  }

  obterDadosEstoque(): void {
    this.loading = true;
    this._dashboardService
      .obterDadosEstoque()
      .subscribe((dashboardProdutos: DashboardProdutos) => {
        this.dashboardProdutos = dashboardProdutos;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openModalDetalheEstoquePontosVenda(): void {
    this._dialogService.open(ModalDetalheEstoquePontosVendaComponent, {
      header: 'Estoque detalhado por ponto de venda',
      width: '40%',
    });
  }
}
