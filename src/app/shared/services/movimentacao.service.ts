import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Movimentacao } from '../../models/movimentacao.model';
import { Pageable } from '../../models/pageable.model';
import { MovimentacaoFiltro } from '../../models/filtro-movimentacao.model';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private _apiUrl = `${environment.apiUrl}/movimentacoes`;

  constructor(private _http: HttpClient) {}

  find(id: number): Observable<Movimentacao> {
    return this._http.get<Movimentacao>(`${this._apiUrl}/${id}`);
  }

  obterTodas(filter: MovimentacaoFiltro): Observable<Pageable<Movimentacao>> {
    const params = this.getParams(filter);
    return this._http.get<Pageable<Movimentacao>>(`${this._apiUrl}?${params}`);
  }

  criar(movimentacao: Movimentacao): Observable<Movimentacao[]> {
    return this._http.post<Movimentacao[]>(this._apiUrl, movimentacao);
  }

  update(id: number, movimentacao: Movimentacao): Observable<Movimentacao> {
    return this._http.put<Movimentacao>(`${this._apiUrl}/${id}`, movimentacao);
  }

  deletar(id: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${id}`);
  }

  private getParams(filter: MovimentacaoFiltro): URLSearchParams {
    const params = new URLSearchParams();
    for (const key in filter) {
      if (filter[key]) {
        if (key.startsWith('data')) {
          const data = new Date(filter[key]);
          const dataParam = moment(data).format('YYYY-MM-DD');
          params.set(key, dataParam);
        } else if (key.startsWith('itensP')) {
          params.set('size', filter[key]);
        } else {
          params.set(key === 'pagina' ? 'page' : key, filter[key]);
        }
      }
    }
    return params;
  }
}
