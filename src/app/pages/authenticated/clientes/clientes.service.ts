import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClienteDTO } from '../../../models/cliente.model';
import { ClienteFIltro } from '../../../models/cliente-filtro.model';
import { Pageable } from '../../../models/pageable.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private _apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private _http: HttpClient) {}

  pesquisar(filtro: ClienteFIltro): Observable<Pageable<ClienteDTO>> {
    const params = this.getParams(filtro);
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());
    return this._http.get<Pageable<ClienteDTO>>(`${this._apiUrl}?${params}`);
  }

  obterClientes(): Observable<ClienteDTO[]> {
    return this._http.get<ClienteDTO[]>(`${this._apiUrl}/todos`);
  }

  obterCliente(id: number): Observable<ClienteDTO> {
    return this._http.get<ClienteDTO>(`${this._apiUrl}/${id}`);
  }

  saveOrUpdate(cliente: ClienteDTO): Observable<ClienteDTO> {
    if (cliente.id) {
      return this._http.put<ClienteDTO>(
        `${this._apiUrl}/${cliente.id}`,
        cliente
      );
    }
    return this._http.post<ClienteDTO>(this._apiUrl, cliente);
  }

  deletar(id: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${id}`);
  }

  private getParams(filter: ClienteFIltro): URLSearchParams {
    const params = new URLSearchParams();
    for (const key in filter) {
      if (filter[key]) {
        debugger;
        if (key.includes('cpf')) {
          const somenteNumeros = String(filter[key]).replace(/[^0-9]/g, '');
          params.set(key, somenteNumeros);
        } else {
          params.set(key, filter[key]);
        }
      }
    }
    return params;
  }
}
