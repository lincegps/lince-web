import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Produto } from '../../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private _apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private _http: HttpClient) {}

  obterTodos(): Observable<Produto[]> {
    return this._http.get<Produto[]>(this._apiUrl);
  }
}
