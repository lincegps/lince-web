import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { TokenService } from './../token/token.service';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = `${environment.apiUrl}/auth`;
  private _apiUrllogin = `${environment.apiUrl}/login`;

  readonly jwtHelper = new JwtHelperService();
  username: string;

  constructor(
    private _tokenService: TokenService,
    private _router: Router,
    private _http: HttpClient
  ) {}

  login(username: string, password: string) {
    return this._http.post(
      `${this._apiUrllogin}`,
      {
        username,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  refreshToken() {
    return this._http.post(
      `${this._apiUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text',
      }
    );
  }

  successfulLogin(response: HttpResponse<string>) {
    const headerAuthorization = response.headers.get('Authorization');
    const token = headerAuthorization.substring(7);
    this.username = this.jwtHelper.decodeToken(token).sub;
    this._tokenService.setToken(token);
  }

  handleLogin(path: string): void {
    this._router.navigate(['login', btoa(path)]);
  }

  estaLogado(): boolean {
    if (this._tokenService.hasToken()) {
      return true;
    }
    return false;
  }

  tokenEstaExpirado() {
    if (this._tokenService.hasToken()) {
      return this.jwtHelper.isTokenExpired(this._tokenService.getToken());
    } else {
      return false;
    }
  }
}
