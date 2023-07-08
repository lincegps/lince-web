import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../../models/cliente.model';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { VendasService } from '../../vendas/vendas.service';
import { SweetalertService } from '../../../../shared/services/sweetalert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Venda } from '../../../../models/venda.model';
import { Contato } from '../../../../models/contato.model';
import { ContatoService } from '../contato.service';
import { AppUtil } from '../../../../shared/utils/app.util';
import { Builder } from 'builder-pattern';
import { DataDialogRefClosed } from '../contato-pos-venda.component';

@Component({
  selector: 'app-contato-pos-venda-form',
  templateUrl: './contato-pos-venda-form.component.html',
  styleUrls: ['./contato-pos-venda-form.component.css'],
})
export class ContatoPosVendaFormComponent implements OnInit {
  private clientes: ClienteDTO[] = [];
  clientesFiltrados: ClienteDTO[] = [];
  contato = new Contato();
  numeroSerie: string;
  venda: Venda;

  loadingInputNumeroSerie = false;

  maxDateValue = new Date();
  tiposContato = AppUtil.tiposDeContatos();
  feedBackContato = AppUtil.tiposDeFeedBack();
  debounce = new Subject<string>();

  constructor(
    private _ref: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private _vendaService: VendasService,
    private _sweetAlertaService: SweetalertService,
    private _contatoService: ContatoService
  ) {}

  ngOnInit(): void {
    this.listemInputNumeroSerie();
    const idContato = this._config.data.idContato;
    const numeroSerie = String(this._config.data.numeroSerie);
    if (idContato) {
      this.obterContatoPorId(idContato);
    }
    if (numeroSerie) {
      this.loadingInputNumeroSerie = true;
      this.numeroSerie = numeroSerie;
      this.obterVendaPorNumeroDeSerie(numeroSerie);
    }
  }

  listemInputNumeroSerie() {
    this.debounce
      .pipe(distinctUntilChanged(), debounceTime(600))
      .subscribe(async (value: string) => {
        if (value) {
          this.loadingInputNumeroSerie = true;
          this.obterVendaPorNumeroDeSerie(value);
        }
      });
  }

  obterVendaPorNumeroDeSerie(numeroSerie: string) {
    this._vendaService
      .findPorNumeroSerie(numeroSerie)
      .then((venda) => {
        this.venda = venda;
      })
      .catch((erro) => {
        this.venda = null;
        const httpErro = erro as HttpErrorResponse;
        if (httpErro.status === 404) {
          this._sweetAlertaService.notificarError(
            'Venda não encontrada para o número de série ' + this.numeroSerie,
            null,
            httpErro
          );
        } else {
          this._sweetAlertaService.notificarError(
            'Ocorreu um erro ao tentar vendo para o númer de serie' +
              this.numeroSerie,
            null,
            httpErro
          );
        }
      })
      .finally(() => (this.loadingInputNumeroSerie = false));
  }

  obterContatoPorId(idContato: number) {
    this._contatoService.find(idContato).subscribe(
      (contato: Contato) => {
        this.contato = contato;
        this.contato.data = new Date(contato.data);
        this.numeroSerie = this.contato.venda.numeroSerie;
        this.venda = this.contato.venda;
        if (contato.dataRetornoLigacao)
          this.contato.dataRetornoLigacao = new Date(
            contato.dataRetornoLigacao
          );
      },
      (erro) => {
        this._ref.close();
        this._sweetAlertaService.notificarError(
          'Erro ao buscar constato',
          null,
          erro
        );
      }
    );
  }

  fecharDialog() {
    this._ref.close();
  }

  onSubmit() {
    this.contato.venda = this.venda;
    this._contatoService.insertOrUpdate(this.contato).subscribe(
      (constatoSalvo) => {
        if (this.contato.id) {
          this._sweetAlertaService.notificarSucesso(
            'Contato atualizado com sucesso!'
          );
          this._ref.close(
            Builder<DataDialogRefClosed<Contato>>()
              .objeto(constatoSalvo)
              .insert(false)
              .build()
          );
        } else {
          this._sweetAlertaService.notificarSucesso(
            'Contato salvo com sucesso!'
          );
          this._ref.close(
            Builder<DataDialogRefClosed<Contato>>()
              .objeto(constatoSalvo)
              .insert(true)
              .build()
          );
        }
      },
      (err) =>
        this._sweetAlertaService.notificarError(
          'Erro ao tentar salvar contato',
          null,
          err
        )
    );
  }

  private listemDialogRef(dialogRef: DynamicDialogRef): void {
    dialogRef.onClose.subscribe((data: ClienteDTO) => {
      if (data) {
        if (data instanceof ClienteDTO) {
          this.clientes.push(data);
        }
      }
    });
  }
}
