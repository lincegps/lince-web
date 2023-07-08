import { PontoVenda } from './ponto-venda.model';
import { TipoMovimnetacao } from './enums/tipo-movimentacao.enum';
import { TipoProduto } from './enums/tipo-produto.model';

export class Movimentacao {
  constructor(
    public id?: number,
    public tipoMovimentacao?: TipoMovimnetacao,
    public quantidade?: number,
    public data?: Date,
    public idProduto?: number,
    public nomeProduto?: string,
    public tipoProduto?: TipoProduto,
    public pontoVendaDTOOrigem?: PontoVenda,
    public pontoVendaDTODestino?: PontoVenda
  ) {
    this.pontoVendaDTOOrigem = new PontoVenda();
    this.pontoVendaDTODestino = new PontoVenda();
  }
}
