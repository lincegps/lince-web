export class VendaFiltro {
  constructor(
    public pontoVenda?: number,
    public tipoProduto?: string,
    public dataCriacaoInicio?: Date,
    public dataCriacaoFim?: Date,
    public dataVencimentoInicio?: Date,
    public dataVencimentoFim?: Date,
    public formaPagamento?: String,
    public numeroSerie?: String,
    public statusVenda?: String,
    public pagina?: number,
    public itensPorPagina?: number
  ) {
    this.pagina = 0;
    this.itensPorPagina = 7;
  }
}
