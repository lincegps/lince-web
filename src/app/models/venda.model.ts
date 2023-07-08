import { ClienteDTO } from './cliente.model';
import { StatusVenda } from './enums/status-venda.enum';
import { PontoVenda } from './ponto-venda.model';
import { Produto } from './produto.model';

export class Venda {
  constructor(
    public id?: number,
    public produto?: Produto,
    public quantidade?: number,
    public data?: Date,
    public dataVencimento?: Date,
    public pontoVenda?: PontoVenda,
    public cliente?: ClienteDTO,
    public formaPagamento?: string,
    public desconto?: number,
    public valorTotal?: number,
    public numeroSerie?: string,
    public observacao?: string,
    public statusVenda?: StatusVenda,
    public indNotaFiscal?: boolean,
    public bandeira?: string,
    public codigoCartao?: string,
    public pontoVendaEntrega?: PontoVenda
  ) {
    this.indNotaFiscal = false;
  }

  static fromJson(data: any): Venda {
    return Object.assign(new Venda(), data);
  }
}
