import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { EstoqueDetalhado } from '../../../models/estoque-detalhado.interface';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private _apiUrl = `${environment.apiUrl}/estoque`;

  constructor(private _http: HttpClient) {}

  obterQtdEstoqueProduto(
    idPontoVenda: number,
    idProduto: number
  ): Promise<number> {
    return this._http
      .get<number>(
        `${this._apiUrl}/ponto-venda/${idPontoVenda}/produto/${idProduto}`
      )
      .toPromise();
  }

  obterEstoqueDetalhadoPorPontoDeVenda(
    idProduto: number
  ): Observable<EstoqueDetalhado[]> {
    return this._http.get<EstoqueDetalhado[]>(
      `${this._apiUrl}/produto/${idProduto}/detalhado-ponto-venda`
    );
  }
}
