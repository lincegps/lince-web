import { NotificationService } from './../../shared/components/messages/notification.service';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TokenService } from '../security/token/token.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error, caught) => {
        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log('Erro detectado pelo interceptor:');
        console.log(errorObj);

        switch (errorObj.status) {
          case 401:
            this.handle401(errorObj);
            break;

          case 403:
            this.handle403(errorObj);
            break;

          case 422:
            this.handle422(errorObj);
            break;

          default:
            this.handleDefaultEror(errorObj);
        }

        return throwError(errorObj);
      })
    );
  }

  handle403(errorObj) {
    this._notificationService.notify(
      'Erro ao tentar fazer login, favor contactar o administrador!'
    );
    this._tokenService.removeToken();
    this._router.navigate(['/login']);
  }

  handle401(errorObj) {
    this._notificationService.notify(errorObj.message);
  }

  handle422(errorObj) {
    this._notificationService.notify(this.listErrors(errorObj.errors));
  }

  handleDefaultEror(errorObj) {
    console.error(errorObj);
  }

  private listErrors(messages: any[]): string {
    let s: string = '';
    for (var i = 0; i < messages.length; i++) {
      s =
        s +
        '<p><strong>' +
        messages[i].fieldName +
        '</strong>: ' +
        messages[i].message +
        '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
