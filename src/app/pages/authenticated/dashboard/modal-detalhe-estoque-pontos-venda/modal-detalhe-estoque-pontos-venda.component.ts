import { Component, OnInit } from '@angular/core';
import { EstoqueDetalhado } from '../../../../models/estoque-detalhado.interface';
import { EstoqueService } from '../../estoque/estoque.service';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-modal-detalhe-estoque-pontos-venda',
  templateUrl: './modal-detalhe-estoque-pontos-venda.component.html',
  styleUrls: ['./modal-detalhe-estoque-pontos-venda.component.css'],
})
export class ModalDetalheEstoquePontosVendaComponent implements OnInit {
  estoqueDetalhado: EstoqueDetalhado[] = [];
  loading = false;

  constructor(private _estoqueService: EstoqueService) {}

  ngOnInit(): void {
    this.obterEstoqueDetalhado(1);
  }

  obterEstoqueDetalhado(idProduto: number): void {
    this.estoqueDetalhado = [];
    this.loading = true;
    this._estoqueService
      .obterEstoqueDetalhadoPorPontoDeVenda(idProduto)
      .subscribe((estoqueDetalhado) => {
        this.estoqueDetalhado = estoqueDetalhado;
      })
      .add(() => {
        this.loading = false;
      });
  }
}
