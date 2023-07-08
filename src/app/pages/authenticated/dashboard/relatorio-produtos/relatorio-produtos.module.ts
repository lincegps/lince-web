import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioProdutosComponent } from './relatorio-produtos.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [RelatorioProdutosComponent],
  imports: [CommonModule, SharedModule],
  exports: [RelatorioProdutosComponent],
})
export class RelatorioProdutosModule {}
