import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contato } from '../../../models/contato.model';
import { map } from 'rxjs/operators';
import { Venda } from '../../../models/venda.model';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private _apiUrl = `${environment.apiUrl}/contatos`;

  constructor(private _http: HttpClient) {}

  findAll() {
    return this._http.get(this._apiUrl).pipe(
      map((response: any[]) =>
        response.map((data) => {
          const contato = Contato.fromJson(data);
          contato.venda = Venda.fromJson(contato.venda);
          return contato;
        })
      )
    );
  }

  find(id: number) {
    return this._http.get(`${this._apiUrl}/${id}`).pipe(
      map((data: any) => {
        const contato = Contato.fromJson(data);
        contato.venda = Venda.fromJson(contato.venda);
        return contato;
      })
    );
  }

  insertOrUpdate(contato: Contato) {
    if (contato.id) {
      return this._http.put(`${this._apiUrl}/${contato.id}`, contato);
    }
    return this._http.post(this._apiUrl, contato);
  }

  delete(id: number) {
    return this._http.delete(`${this._apiUrl}/${id}`);
  }
}
