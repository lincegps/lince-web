export class ClienteDTO {
  constructor(
    public id?: number,
    public nome?: string,
    public cpfOuCnpj?: string,
    public dataNascimento?: Date,
    public tipoPessoa?: string,
    public telefones?: string[],
    public emails?: string[],
    public enderecos?: string[],
    public numeroSerie?: number
  ) {
    this.telefones = [];
    this.emails = [];
    this.enderecos = [];
    this.tipoPessoa = 'FISICA';
  }

  static fromJson(data: any): ClienteDTO {
    return Object.assign(new ClienteDTO(), data);
  }
}
