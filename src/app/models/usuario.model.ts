export class Usuario {
  constructor(
    public id?: number,
    public nome?: string,
    public usuario?: string,
    public senha?: string,
    public ativo?: boolean
  ) {}

  static fromJson(data: any): Usuario {
    return Object.assign(new Usuario(), data);
  }
}
