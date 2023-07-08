import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PontoVendaComponent } from './ponto-venda.component';

const routes: Routes = [
  {
    path: '',
    component: PontoVendaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PontoVendaRoutingModule {}
