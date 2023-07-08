import { TipoProduto } from './enums/tipo-produto.model';

export class Produto {
  constructor(
    public id?: number,
    public nome?: string,
    public valor?: number,
    public tipo?: TipoProduto
  ) {}
}
