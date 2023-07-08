import { Usuario } from './../../../models/usuario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private _apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private _http: HttpClient) {}

  obterTodos(): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this._apiUrl);
  }

  alterarStatus(idUsuario: number, status: string): Observable<void> {
    let params = new HttpParams();
    params = params.append('statusUsuario', status);
    return this._http.put<void>(`${this._apiUrl}/${idUsuario}`, null, {
      params,
    });
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this._apiUrl, usuario);
  }
}
