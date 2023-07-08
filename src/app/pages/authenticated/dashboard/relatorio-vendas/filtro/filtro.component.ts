import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CalendarUtil } from '../../../../../shared/utils/calendar.util';
import { VendaFiltro } from '../../../../../models/filtro-venda.model';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FiltroComponent implements OnInit {
  @Output() filtrarEvent = new EventEmitter<any>();
  @Input() filtroVencimentos = false;
  @Input() showIcon = false;

  @Input() filtro: VendaFiltro;
  pt = CalendarUtil.getLanguagePtCalendar();

  constructor() {}

  ngOnInit(): void {
    if (!this.filtro) {
      this.filtro = new VendaFiltro();
      const dataAtual = new Date();
      const mes = dataAtual.getMonth();
      const ano = dataAtual.getFullYear();
      const dataInicio = new Date(ano, mes, 1);
      const dataFim = new Date(ano, mes + 1, 0);
      if (this.filtroVencimentos) {
        debugger;
        this.filtro.dataVencimentoInicio = dataInicio;
        this.filtro.dataVencimentoFim = dataFim;
      } else {
        this.filtro.dataCriacaoInicio = dataInicio;
        this.filtro.dataCriacaoFim = dataFim;
      }
    }

    this.filtrar();
  }

  filtrar(): void {
    this.filtrarEvent.emit(this.filtro);
  }
}
