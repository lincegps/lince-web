import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { VendasComponent } from './vendas.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { VendaFormComponent } from './venda-form/venda-form.component';
import { TableModule } from 'primeng/table';
import { VendaFiltroComponent } from './venda-filtro/venda-filtro.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { VendaDetalheComponent } from './venda-detalhe/venda-detalhe.component';

@NgModule({
  declarations: [VendasComponent, VendaFormComponent, VendaFiltroComponent, VendaDetalheComponent],
  imports: [
    CommonModule,
    VendasRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    SelectButtonModule,
    CheckboxModule,
  ],
  providers: [DialogService, MessageService],
})
export class VendasModule {}
