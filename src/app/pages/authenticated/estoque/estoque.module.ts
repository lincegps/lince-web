import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque.component';
import { ModalFormMovimentacaoComponent } from './modal-form-movimentacao/modal-form-movimentacao.component';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [EstoqueComponent, ModalFormMovimentacaoComponent],
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    CalendarModule,
    TableModule,
    DynamicDialogModule,
    AccordionModule,
    DropdownModule,
    AutoCompleteModule,
    InputTextModule,
    SelectButtonModule,
  ],
})
export class EstoqueModule {}
