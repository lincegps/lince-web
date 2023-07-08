import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { ModalDetalheEstoquePontosVendaComponent } from './modal-detalhe-estoque-pontos-venda/modal-detalhe-estoque-pontos-venda.component';

import { TabViewModule } from 'primeng/tabview';
import { RelatorioVendasModule } from './relatorio-vendas/relatorio-vendas.module';
import { RelatorioProdutosModule } from './relatorio-produtos/relatorio-produtos.module';
import { RelatorioVendasVencimentosModule } from './relatorio-vendas-vencimentos/relatorio-vendas-vencimentos.module';
import { VendaDetalheModalComponent } from './venda-detalhe-modal/venda-detalhe-modal.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ModalDetalheEstoquePontosVendaComponent,
    VendaDetalheModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    RelatorioProdutosModule,
    RelatorioVendasModule,
    RelatorioVendasVencimentosModule,
    TabViewModule,
    CalendarModule,
  ],
})
export class DashboardModule {}
