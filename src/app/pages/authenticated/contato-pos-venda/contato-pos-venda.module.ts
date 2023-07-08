import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoPosVendaRoutingModule } from './contato-pos-venda-routing.module';
import { ContatoPosVendaComponent } from './contato-pos-venda.component';
import { ButtonModule } from 'primeng/button';
import { ContatoPosVendaFormComponent } from './contato-pos-venda-form/contato-pos-venda-form.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InfoVendaComponent } from './contato-pos-venda-form/info-venda/info-venda.component';

@NgModule({
  declarations: [
    ContatoPosVendaComponent,
    ContatoPosVendaFormComponent,
    InfoVendaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContatoPosVendaRoutingModule,
    ButtonModule,
    AutoCompleteModule,
    DividerModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    InputTextareaModule,
    TableModule,
  ],
})
export class ContatoPosVendaModule {}
