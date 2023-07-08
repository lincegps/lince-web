import { VendasComponent } from './vendas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendaFormComponent } from './venda-form/venda-form.component';

const routes: Routes = [
  {
    path: '',
    component: VendasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendasRoutingModule {}
