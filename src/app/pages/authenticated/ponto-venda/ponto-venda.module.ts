import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PontoVendaRoutingModule } from './ponto-venda-routing.module';
import { PontoVendaComponent } from './ponto-venda.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ModalPontovendaFormComponent } from './modal-pontovenda-form/modal-pontovenda-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [PontoVendaComponent, ModalPontovendaFormComponent],
  imports: [
    CommonModule,
    PontoVendaRoutingModule,
    FormsModule,
    SharedModule,
    //PrimeNG
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    DynamicDialogModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule,
  ],
  providers: [MessageService],
})
export class PontoVendaModule {}
