import { SelectItem } from 'primeng/api';

export class AppUtil {
  static FORMATO_XLS =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  static formasDePagamentos(): SelectItem[] {
    return [
      { value: null, label: 'Selecione ' },
      { value: 'DINHEIRO', label: 'Dinheiro' },
      { value: 'DEBITO', label: 'Débito' },
      { value: 'UMA_VEZ', label: '1x' },
      { value: 'DUAS_VEZES', label: '2x' },
      { value: 'TRES_VEZES', label: '3x' },
      { value: 'QUATRO_VEZES', label: '4x' },
      { value: 'CINCO_VEZES', label: '5x' },
      { value: 'SEIS_VEZES', label: '6x' },
      { value: 'ONLINE', label: 'Online' },
      { value: 'VENDA_ASSISTIDA', label: 'Venda Assistida' },
      { value: 'CARTAO_DINHEIRO', label: 'Cartão + Dinheiro' },
      { value: 'BOLETO', label: 'Boleto' },
      { value: 'BB_TRONICA', label: 'BB Trônica' },
      { value: 'CORTESIA', label: 'Cortesia' },
      { value: 'PIX', label: 'Pix' },
      { value: 'TRANFERENCIA', label: 'Tranferência' },
      { value: 'Outros', label: 'Outros' },
    ];
  }

  static tiposDeContatos() {
    return [
      { label: 'Selecione um tipo', value: null },
      {
        label: 'Ligação telefônica',
        value: 'LIGACAO_TELEFONICA',
      },
      {
        label: 'Whatsapp',
        value: 'WHATSAPP',
      },
    ];
  }

  static tiposDeFeedBack() {
    return [
      { label: 'Selecione um feedback', value: null },
      { label: 'Sim', value: 'S' },
      { label: 'Não', value: 'N' },
      { label: 'Telefone errado', value: 'FE' },
      { label: 'Telefne desligado', value: 'FD' },
      { label: 'Whatsapp enviado', value: 'WE' },
      { label: 'Whatsapp respondido', value: 'WR' },
    ];
  }

  /**
   *Função para downlod de de aquivo;
   * @param dados - Array Buffer dados
   * @param tipo - tipo do arquivo
   * @param nomeArquivo - Name arquivo
   */
  static downLoadFile(dados: any, tipo: string, nomeArquivo: string) {
    const blob = new Blob([dados], { type: tipo });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = nomeArquivo;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
