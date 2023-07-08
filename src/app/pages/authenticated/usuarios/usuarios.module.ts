import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ModalUsuarioFormComponent } from './modal-usuario-form/modal-usuario-form.component';

@NgModule({
  declarations: [UsuariosComponent, ModalUsuarioFormComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,

    //PrimeNG
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RadioButtonModule,
  ],
})
export class UsuariosModule {}
