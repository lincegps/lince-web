import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioVendasComponent } from './relatorio-vendas.component';
import { FiltroComponent } from './filtro/filtro.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [RelatorioVendasComponent, FiltroComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
  ],
  exports: [RelatorioVendasComponent, FiltroComponent],
  providers: [DialogService],
})
export class RelatorioVendasModule {}
