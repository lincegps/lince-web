import { TipoPontoVendaEnum } from './enums/tipo-ponto-venda.enum';

export class PontoVenda {
  constructor(
    public id?: number,
    public nome?: string,
    public cidade?: string,
    public bairro?: string,
    public responsavel?: string,
    public telefones?: string[],
    public emails?: string[],
    public tipo?: TipoPontoVendaEnum,
    public ativo?: boolean
  ) {
    this.telefones = [];
    this.emails = [];
  }

  static fromJson(data: any): PontoVenda {
    return Object.assign(new PontoVenda(), data);
  }
}
