import { DashboardProdutos } from './../../../models/dashboard-produto.model';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private _http: HttpClient) {}

  public obterDadosEstoque(): Observable<DashboardProdutos> {
    return this._http.get<DashboardProdutos>(`${this._apiUrl}/produtos`);
  }
}
