import { TokenService } from './../../security/token/token.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../security/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

import * as moment from 'moment';

@Component({
  selector: 'app-usuario-inativo',
  template: ``,
})
export class UsuarioInativoComponent implements OnInit, OnDestroy {
  readonly validadeSessao = '_validadeSessao';
  readonly quinzeSegundos = 15000;
  readonly intervaloDeTempoParaVerificarSeUsuarioEstaAtivo = this
    .quinzeSegundos;
  private _validandoSessao = false;
  private _intervalId: any;
  private _tempoDeValidadeDaSessao = 15;

  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _sweetalertService: SweetalertService
  ) {}

  ngOnInit(): void {
    console.info(
      `tempo de sessão configurado: ${this._tempoDeValidadeDaSessao} minutos`
    );
    this.renovarTempoDeSessao();
    this.monitorarAtividadeDoUsuario();
    this.monitorarSeUsuarioEstaAtivo();
  }

  ngOnDestroy(): void {
    clearInterval(this._intervalId);
  }

  renovarTempoDeSessao() {
    const validade = moment()
      .add(this._tempoDeValidadeDaSessao, 'minutes')
      .unix();
    localStorage.setItem(this.validadeSessao, validade.toString());
    this._validandoSessao = false;
  }

  monitorarAtividadeDoUsuario() {
    if (!this._authService.estaLogado()) {
      return;
    }

    window.addEventListener(
      'mousemove',
      this.verificarValidadeDoToken.bind(this),
      true
    );
    window.addEventListener(
      'scroll',
      this.verificarValidadeDoToken.bind(this),
      true
    );
    window.addEventListener(
      'keydown',
      this.verificarValidadeDoToken.bind(this),
      true
    );
  }

  monitorarSeUsuarioEstaAtivo() {
    this._intervalId = setInterval(() => {
      this.usuarioEstaAtivo();
    }, this.intervaloDeTempoParaVerificarSeUsuarioEstaAtivo);
  }

  usuarioEstaAtivo() {
    if (!this._validandoSessao && this._authService.estaLogado()) {
      this._validandoSessao = true;
      const validadeSessao = parseInt(
        localStorage.getItem(this.validadeSessao),
        10
      );
      const now = moment().unix();
      if (validadeSessao < now) {
        this.deslogarUsuarioComNotificacao();
        this._validandoSessao = false;
      } else {
        this._validandoSessao = false;
      }
    }
  }

  verificarValidadeDoToken() {
    if (this._validandoSessao) {
      return;
    }

    this._validandoSessao = true;
    const tokenExpirado = this._authService.tokenEstaExpirado();

    tokenExpirado
      ? this.deslogarUsuarioComNotificacao()
      : this.renovarTempoDeSessao();
  }

  deslogarUsuarioComNotificacao() {
    this._validandoSessao = false;
    this._tokenService.removeToken();
    this._sweetalertService.notificarWarningComOnClose(
      'Tempo de inatividade acima de 15 minutos. É preciso realizar login novamente',
      () => {
        this.pararMonitoramentoDeUsuarioInativo();
      }
    );
  }

  pararMonitoramentoDeUsuarioInativo() {
    this._authService.handleLogin('/');
    window.removeEventListener(
      'mousemove',
      this.verificarValidadeDoToken.bind(this),
      true
    );
    window.removeEventListener(
      'scroll',
      this.verificarValidadeDoToken.bind(this),
      true
    );
    window.removeEventListener(
      'keydown',
      this.verificarValidadeDoToken.bind(this),
      true
    );
  }
}
