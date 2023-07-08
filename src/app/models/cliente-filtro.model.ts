export class ClienteFIltro {
  constructor(
    public pagina?: number,
    public itensPorPagina?: number,
    public cpf?: string,
    public nome?: string,
    public numeroSerie?: string
  ) {
    this.pagina = 0;
    this.itensPorPagina = 2;
  }
}
