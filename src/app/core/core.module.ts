import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioInativoComponent } from './components/usuario-inativo/usuario-inativo.component';

@NgModule({
  declarations: [UsuarioInativoComponent],
  imports: [CommonModule],
  exports: [UsuarioInativoComponent],
})
export class CoreModule {}
