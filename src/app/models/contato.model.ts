import { Venda } from './venda.model';
export class Contato {
  constructor(
    public id?: number,
    public data?: Date,
    public tipo?: string,
    public feedback?: string,
    public satisfeito?: boolean,
    public retornarLigacao?: boolean,
    public dataRetornoLigacao?: Date,
    public observacao?: string,
    public venda?: Venda
  ) {
    this.venda = new Venda();
  }

  static fromJson(data: any): Contato {
    return Object.assign(new Contato(), data);
  }
}
