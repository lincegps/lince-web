import { TipoProduto } from './../../../models/enums/tipo-produto.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Venda } from '../../../models/venda.model';
import { map, timeout, tap } from 'rxjs/operators';
import { VendaFiltro } from '../../../models/filtro-venda.model';

import * as moment from 'moment';
import { Pageable } from '../../../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  private _apiUrl = `${environment.apiUrl}/vendas`;

  constructor(private _http: HttpClient) {}

  find(idVenda: number): Observable<Venda> {
    return this._http.get<Venda>(`${this._apiUrl}/${idVenda}`).pipe(
      map((data) => {
        const venda = Venda.fromJson(data);
        venda.data = new Date(venda.data);
        venda.dataVencimento = new Date(venda.dataVencimento);
        return venda;
      })
    );
  }

  pesquisar(filtro: VendaFiltro): Observable<Pageable<Venda>> {
    const params = this.getParams(filtro);
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    return this._http.get<Pageable<Venda>>(`${this._apiUrl}?${params}`);
  }

  obterTodasSemPaginacao(filtro: VendaFiltro): Observable<Venda[]> {
    const params = this.getParams(filtro);
    return this._http
      .get<Venda[]>(`${this._apiUrl}/sem-paginacao?${params}`)
      .pipe(
        map((response: any[]) => response.map((data) => Venda.fromJson(data)))
      );
  }

  obterTotalDeVendasPorPeriodo(filtro: VendaFiltro): Observable<any> {
    const params = this.getParams(filtro);
    return this._http.get(`${this._apiUrl}/qtd-por-periodo?${params}`);
  }

  obterValorTotalVendasPorPeriodo(filtro: VendaFiltro): Observable<any> {
    const params = this.getParams(filtro);
    return this._http.get(`${this._apiUrl}/valor-por-periodo?${params}`);
  }

  saveOrUpdate(venda: Venda): Observable<Venda> {
    if (venda.id) {
      return this._http
        .put<Venda>(`${this._apiUrl}/${venda.id}`, venda)
        .pipe(map((data: any) => Venda.fromJson(data)));
    }
    return this._http
      .post<Venda>(this._apiUrl, venda)
      .pipe(map((data: any) => Venda.fromJson(data)));
  }

  cancelar(idVenda: number) {
    return this._http.delete(`${this._apiUrl}/${idVenda}`);
  }

  obterDataVencimento(
    dataBase: Date,
    tipoProduto: TipoProduto,
    clienteId: number,
    pontoVendaId: number
  ) {
    return this._http.get(
      `${this._apiUrl}/data-vencimento?dataBase=${moment(dataBase).format(
        'YYYY-MM-DD'
      )}&tipoProduto=${tipoProduto}&clienteId=${clienteId}&pontoVendaId=${pontoVendaId}`
    );
  }

  findPorNumeroSerie(numeroSerie: string) {
    return this._http
      .get(`${this._apiUrl}/${numeroSerie}/numero-serie`)
      .toPromise();
  }

  exportar(filtro: VendaFiltro) {
    const params = this.getParams(filtro);
    return this._http
      .get(`${this._apiUrl}/exportar?${params}`, {
        responseType: 'arraybuffer',
      })
      .pipe(timeout(900000));
  }

  private getParams(filter: VendaFiltro): URLSearchParams {
    const params = new URLSearchParams();
    for (const key in filter) {
      if (filter[key]) {
        if (key.startsWith('data')) {
          const data = new Date(filter[key]);
          const dataParam = moment(data).format('YYYY-MM-DD');
          params.set(key, dataParam);
        } else {
          params.set(key, filter[key]);
        }
      }
    }
    return params;
  }
}
