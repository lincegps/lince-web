import { VendaFiltro } from './../../../../models/filtro-venda.model';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { VendasService } from '../../vendas/vendas.service';
import { DialogService } from 'primeng/dynamicdialog';
import { VendaDetalheModalComponent } from '../venda-detalhe-modal/venda-detalhe-modal.component';

interface QuantidadeVendaPorPeriodoDTO {
  quantidadeAparelho: number;
  valorAparelho: number;
  quantidadeAssinatura: number;
  valorAssinatura: number;
}

@Component({
  selector: 'app-relatorio-vendas',
  templateUrl: './relatorio-vendas.component.html',
  styleUrls: ['./relatorio-vendas.component.css'],
})
export class RelatorioVendasComponent implements AfterViewChecked {
  quantidadeVendaPorPeriodoDTO: QuantidadeVendaPorPeriodoDTO;

  loading = false;

  filtro: VendaFiltro;

  constructor(
    private _vendaService: VendasService,
    private _dialogService: DialogService,
    private _cdf: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this._cdf.detectChanges();
  }

  pesquisarVendasPorPeriodo(filtro: VendaFiltro): void {
    this.filtro = filtro;
    this.obterVendasPorPerido(filtro);
  }

  obterVendasPorPerido(filtro: VendaFiltro): void {
    this.loading = true;
    this._vendaService
      .obterTotalDeVendasPorPeriodo(filtro)
      .subscribe((res: QuantidadeVendaPorPeriodoDTO) => {
        this.quantidadeVendaPorPeriodoDTO = res;
      })
      .add(() => {
        this.loading = false;
      });
  }

  openModalVendaDetalheModal(): void {
    this._dialogService.open(VendaDetalheModalComponent, {
      header: 'Vendas detalhadas',
      width: '50%',
      data: {
        filtro: this.filtro,
      },
    });
  }
}
