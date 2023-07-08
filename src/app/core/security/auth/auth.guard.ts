import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private tokenService: TokenService,
    private _authService: AuthService
  ) {}

  canLoad(route: Route): boolean {
    return this.checkAuthentication(`${route?.path}`);
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
    return this.checkAuthentication(`${activatedRoute.routeConfig?.path}`);
  }

  private checkAuthentication(path: string): boolean {
    const hasToken = this.tokenService.hasToken();
    if (!hasToken) {
      this._authService.handleLogin(`/${path}`);
    }
    return hasToken;
  }
}
