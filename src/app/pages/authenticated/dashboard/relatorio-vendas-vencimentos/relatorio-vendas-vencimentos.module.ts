import { RelatorioVendasModule } from './../relatorio-vendas/relatorio-vendas.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioVendasVencimentosComponent } from './relatorio-vendas-vencimentos.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [RelatorioVendasVencimentosComponent],
  imports: [CommonModule, RelatorioVendasModule, SharedModule, CalendarModule],
  exports: [RelatorioVendasVencimentosComponent],
})
export class RelatorioVendasVencimentosModule {}
