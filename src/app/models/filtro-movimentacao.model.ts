import { TipoMovimnetacao } from './enums/tipo-movimentacao.enum';
export class MovimentacaoFiltro {
  constructor(
    public tipoMovimentacao?: TipoMovimnetacao,
    public tipoProduto?: string,
    public dataInicio?: Date,
    public dataFim?: Date,
    public pontoVendaOrigem?: number,
    public pontoVendaDestino?: number,
    public pagina?: number,
    public itensPorPagina?: number
  ) {
    this.itensPorPagina = 7;
  }
}
