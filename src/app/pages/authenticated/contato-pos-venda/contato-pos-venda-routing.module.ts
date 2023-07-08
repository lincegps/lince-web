import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoPosVendaComponent } from './contato-pos-venda.component';

const routes: Routes = [
  {
    path: '',
    component: ContatoPosVendaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoPosVendaRoutingModule {}
