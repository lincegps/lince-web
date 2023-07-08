import { PontoVenda } from './../../../models/ponto-venda.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PontoVendaService {
  private _apiUrl = `${environment.apiUrl}/ponto-vendas`;

  constructor(private _http: HttpClient) {}

  obterPontoVendas(): Observable<PontoVenda[]> {
    return this._http
      .get<PontoVenda[]>(this._apiUrl)
      .pipe(
        map((response: any[]) =>
          response.map((data: any) => PontoVenda.fromJson(data))
        )
      );
  }

  obterPontoVenda(id: number): Observable<PontoVenda> {
    return this._http.get<PontoVenda>(`${this._apiUrl}/${id}`);
  }

  saveOrUpdate(pontovenda: PontoVenda): Observable<PontoVenda> {
    if (pontovenda.id) {
      return this._http.put<PontoVenda>(
        `${this._apiUrl}/${pontovenda.id}`,
        pontovenda
      );
    }
    return this._http
      .post<PontoVenda>(this._apiUrl, pontovenda)
      .pipe(map((data: any) => PontoVenda.fromJson(data)));
  }

  deletar(id: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${id}`);
  }
}
