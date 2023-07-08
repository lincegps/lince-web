import { Component, OnInit } from '@angular/core';
import { VendaFiltro } from '../../../../models/filtro-venda.model';
import { Venda } from '../../../../models/venda.model';
import { VendasService } from '../../vendas/vendas.service';

@Component({
  selector: 'app-relatorio-vendas-vencimentos',
  templateUrl: './relatorio-vendas-vencimentos.component.html',
  styleUrls: ['./relatorio-vendas-vencimentos.component.css'],
})
export class RelatorioVendasVencimentosComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(private _vendaService: VendasService) {}

  ngOnInit(): void {}

  pesquisar(filtro: VendaFiltro): void {
    this._vendaService
      .obterTodasSemPaginacao(filtro)
      .subscribe((vendas: Venda[]) => {
        this.vendas = vendas;
      });
  }
}
