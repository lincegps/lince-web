import { AppUtil } from './../../../../shared/utils/app.util';
import { VendaFiltro } from './../../../../models/filtro-venda.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PontoVendaService } from '../../ponto-venda/ponto-venda.service';
import { PontoVenda } from '../../../../models/ponto-venda.model';
import { TipoPontoVendaEnum } from '../../../../models/enums/tipo-ponto-venda.enum';
import { CalendarUtil } from '../../../../shared/utils/calendar.util';
import { StatusVenda } from '../../../../models/enums/status-venda.enum';

@Component({
  selector: 'app-venda-filtro',
  templateUrl: './venda-filtro.component.html',
  styleUrls: ['./venda-filtro.component.css'],
})
export class VendaFiltroComponent implements OnInit {
  @Output() filtroEvent = new EventEmitter<VendaFiltro>();

  filtro: VendaFiltro = new VendaFiltro();

  produtos: SelectItem[];
  pontosVendas: SelectItem[] = [];
  formasDePagamentos = AppUtil.formasDePagamentos();

  pt = CalendarUtil.getLanguagePtCalendar();

  statusItens: SelectItem[] = [];

  constructor(private _pontosVendasService: PontoVendaService) {
    this.statusItens = [
      {
        label: 'Selecione',
        value: null,
      },
      {
        label: StatusVenda.PENDENTE,
        value: StatusVenda.PENDENTE,
      },
      {
        label: StatusVenda.PAGO,
        value: StatusVenda.PAGO,
      },
    ];
  }

  ngOnInit(): void {
    this.produtos = [
      { label: 'Aparelho', value: 'APARELHO' },
      { label: 'Assinatura', value: 'ASSINATURA' },
    ];
    this.obterPontosDeVenda();
    const dataAtual = new Date();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const dataInicio = new Date(ano, mes, 1);
    const dataFim = new Date(ano, mes + 1, 0);
    this.filtro.dataCriacaoInicio = dataInicio;
    this.filtro.dataCriacaoFim = dataFim;
    this.filtrar();
  }

  filtrar(): void {
    this.filtroEvent.next(this.filtro);
  }

  limparFiltro(): void {
    this.filtroEvent.next(new VendaFiltro());
  }

  private obterPontosDeVenda(): void {
    this._pontosVendasService
      .obterPontoVendas()
      .subscribe((pontoVendas: PontoVenda[]) => {
        this.pontosVendas = pontoVendas
          .filter((pv) => pv.tipo === TipoPontoVendaEnum.MINI_MERCADO)
          .map((pv) => ({
            label: pv.nome,
            value: pv.id,
          }));
        this.pontosVendas.unshift({
          value: null,
          label: 'selecione',
        });
      });
  }
}
