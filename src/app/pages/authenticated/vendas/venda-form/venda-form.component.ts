import { AppUtil } from './../../../../shared/utils/app.util';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Builder } from 'builder-pattern';
import { SelectItem } from 'primeng/api';
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../../models/cliente.model';
import { TipoPontoVendaEnum } from '../../../../models/enums/tipo-ponto-venda.enum';
import { PontoVenda } from '../../../../models/ponto-venda.model';
import { Produto } from '../../../../models/produto.model';
import { Venda } from '../../../../models/venda.model';
import { BaseFormComponent } from '../../../../shared/components/base-form/base-form.component';
import { ProdutoService } from '../../../../shared/services/produto.service';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';
import { CalendarUtil } from '../../../../shared/utils/calendar.util';
import { ClientesService } from '../../clientes/clientes.service';
import { PontoVendaService } from '../../ponto-venda/ponto-venda.service';
import { VendasService } from '../vendas.service';
import { ModalClienteFormComponent } from '../../clientes/modal-cliente-form/modal-cliente-form.component';
import { ModalPontovendaFormComponent } from '../../ponto-venda/modal-pontovenda-form/modal-pontovenda-form.component';
import { StatusVenda } from '../../../../models/enums/status-venda.enum';

@Component({
  selector: 'app-venda-form',
  templateUrl: './venda-form.component.html',
  styleUrls: ['./venda-form.component.css'],
})
export class VendaFormComponent extends BaseFormComponent implements OnInit {
  valorTotalVenda = 0;

  private produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];

  private pontoVendas: PontoVenda[] = [];
  pontoVendasFiltrados: PontoVenda[] = [];

  private clientes: ClienteDTO[] = [];
  clientesFiltrados: ClienteDTO[] = [];

  formasDePagamentos = AppUtil.formasDePagamentos();

  pt = CalendarUtil.getLanguagePtCalendar();
  maxDateValue = new Date();

  statusItens: SelectItem[] = [];

  exibirDaDosDoCartao = false;

  constructor(
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _vendasService: VendasService,
    private _sweetAlertaService: SweetalertService,
    private _produtoService: ProdutoService,
    private _pontosVendasService: PontoVendaService,
    private _clientesService: ClientesService,
    private _dialogService: DialogService
  ) {
    super();
    this.buildForm();
    this.statusItens = [
      {
        label: StatusVenda.PENDENTE,
        value: StatusVenda.PENDENTE,
      },
      {
        label: StatusVenda.PAGO,
        value: StatusVenda.PAGO,
      },
    ];
  }

  ngOnInit(): void {
    const idVenda = this._config.data.idVenda;
    if (idVenda) {
      this.obterVenda(idVenda);
    }
    this.obterProdutos();
    this.obterPontosDeVenda();
    this.obterClientes();
  }

  obterVenda(idVenda: number) {
    this._vendasService.find(idVenda).subscribe((venda: Venda) => {
      this.formulario.patchValue(venda);
    });
  }

  filtrarProdutos({ query }: any): void {
    const filtered: Produto[] = [];
    const valorDigitado = query as string;
    for (const produto of this.produtos) {
      if (
        produto?.nome.toLowerCase().indexOf(valorDigitado.toLowerCase()) === 0
      ) {
        filtered.push(produto);
      }
    }
    this.produtosFiltrados = filtered;
  }

  filtrarPontosDeVendas({ query }: any): void {
    const filtered: PontoVenda[] = [];
    const valorDigitado = query as string;
    for (const pontoVenda of this.pontoVendas) {
      if (
        pontoVenda?.nome.toLowerCase().includes(valorDigitado.toLowerCase())
      ) {
        filtered.push(pontoVenda);
      }
    }
    this.pontoVendasFiltrados = filtered;
  }

  filtrarClientes({ query }: any): void {
    const filtered: ClienteDTO[] = [];
    const valorDigitado = query as string;
    for (const cliente of this.clientes) {
      if (cliente?.nome.toLowerCase().includes(valorDigitado.toLowerCase())) {
        filtered.push(cliente);
      }
    }
    this.clientesFiltrados = filtered;
  }

  calculaValorTotal(
    produto: Produto,
    valorDesconto: number,
    quantidadeDigitada: number
  ): void {
    let valorProduto = 0;
    let quantidade = 1;
    if (produto) {
      valorProduto = produto.valor;
    }
    if (quantidadeDigitada) {
      quantidade = quantidadeDigitada;
    }
    this.valorTotalVenda =
      valorProduto * Number(quantidade) - Number(valorDesconto);
  }

  submit(): void {
    const venda = Venda.fromJson(this.formulario.value);
    venda.valorTotal = this.valorTotalVenda;
    this._vendasService.saveOrUpdate(venda).subscribe(
      (vendaSalva: Venda) => {
        this._sweetAlertaService.notificarSucesso('Venda criada com sucesso!');
        this.valorTotalVenda = 0;
        this._ref.close({
          venda: vendaSalva,
          update: venda?.id,
        });
      },
      (httpError: HttpErrorResponse | any) => {
        this._sweetAlertaService.notificarError(
          'Erro ao salvar venda!',
          httpError?.detail,
          httpError
        );
      }
    );
  }

  fecharDialog() {
    this._ref.close({ venda: null, update: null });
  }

  openModalPontovendaForm(): void {
    const dialogRef = this._dialogService.open(ModalPontovendaFormComponent, {
      header: 'Incluir Ponto de Venda',
      width: '50%',
    });
    this.listemDialogRef(dialogRef);
  }

  openModalClienteForm(): void {
    const dialogRef = this._dialogService.open(ModalClienteFormComponent, {
      header: 'Incluir cliente',
      width: '50%',
      baseZIndex: 1038,
    });
    this.listemDialogRef(dialogRef);
  }

  obterDataVencimento() {
    const dataBase = this.formulario.get('data').value;
    const { tipo } = this.formulario.get('produto').value as Produto;
    const { id: clienteId } = this.formulario.get('cliente')
      .value as ClienteDTO;
    const { id: pontoVendaId } = this.formulario.get('pontoVenda')
      .value as ClienteDTO;
    this._vendasService
      .obterDataVencimento(dataBase, tipo, clienteId, pontoVendaId)
      .subscribe((dataVencimento: any) => {
        const dataConvertida = new Date(dataVencimento);
        this.formulario.get('dataVencimento').setValue(dataConvertida);
      });
  }

  private listemDialogRef(dialogRef: DynamicDialogRef): void {
    dialogRef.onClose.subscribe((data: ClienteDTO | PontoVenda) => {
      if (data) {
        if (data instanceof ClienteDTO) {
          this.clientes.push(data);
          this.formulario.get('cliente').setValue(data);
        }
        if (data instanceof PontoVenda) {
          this.pontoVendas.push(data);
          this.formulario.get('pontoVenda').setValue(data);
        }
      }
    });
  }

  private buildForm(): void {
    this.formulario = this._fb.group({
      id: [null],
      pontoVenda: [null, Validators.required],
      pontoVendaEntrega: [null, Validators.required],
      produto: [null, Validators.required],
      numeroSerie: [null, Validators.required],
      data: [null],
      dataVencimento: [null],
      cliente: [null, Validators.required],
      valor: [null, Validators.required],
      desconto: [null],
      formaPagamento: [null, Validators.required],
      observacao: [null],
      statusVenda: [StatusVenda.PENDENTE],
      indNotaFiscal: [false],
      bandeira: [null],
      codigoCartao: [null],
    });
  }

  private obterProdutos(): void {
    this._produtoService.obterTodos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  private obterPontosDeVenda(): void {
    this._pontosVendasService
      .obterPontoVendas()
      .subscribe((pontoVendas: PontoVenda[]) => {
        this.pontoVendas = pontoVendas.filter(
          (pv) => pv.tipo === TipoPontoVendaEnum.MINI_MERCADO
        );
      });
  }

  private obterClientes(): void {
    this._clientesService
      .obterClientes()
      .subscribe((clientes: ClienteDTO[]) => {
        this.clientes = clientes;
      });
  }

  onChangeFormaPagamento() {
    this.exibirDaDosDoCartao =
      this.formulario.get('formaPagamento').value === 'DEBITO' ||
      this.formulario.get('formaPagamento').value === 'UMA_VEZ' ||
      this.formulario.get('formaPagamento').value === 'DUAS_VEZES' ||
      this.formulario.get('formaPagamento').value === 'TRES_VEZES' ||
      this.formulario.get('formaPagamento').value === 'QUATRO_VEZES' ||
      this.formulario.get('formaPagamento').value === 'CINCO_VEZES' ||
      this.formulario.get('formaPagamento').value === 'SEIS_VEZES' ||
      this.formulario.get('formaPagamento').value === 'CARTAO_DINHEIRO';

    if (this.formulario.get('formaPagamento').value === 'CORTESIA') {
      this.formulario.get('valor').setValidators([]);
      this.formulario.get('valor').updateValueAndValidity();
      this.formulario.get('valor').setValue('0');
    } else {
      this.formulario.get('valor').setValidators([Validators.required]);
      this.formulario.get('valor').updateValueAndValidity();
      this.formulario.get('valor').setValue('');
    }
  }
}
