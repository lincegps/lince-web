import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'estoque',
        loadChildren: () =>
          import('./estoque/estoque.module').then((m) => m.EstoqueModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'ponto-venda',
        loadChildren: () =>
          import('./ponto-venda/ponto-venda.module').then(
            (m) => m.PontoVendaModule
          ),
      },
      {
        path: 'vendas',
        loadChildren: () =>
          import('./vendas/vendas.module').then((m) => m.VendasModule),
      },
      {
        path: 'contato',
        loadChildren: () =>
          import('./contato-pos-venda/contato-pos-venda.module').then(
            (m) => m.ContatoPosVendaModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}
