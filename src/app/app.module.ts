import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptorProvider } from './core/interceptors/error-interceptor';
import {
  AuthInterceptor,
  AuthInterceptorProvide,
} from './core/security/auth/auth.interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AuthInterceptorProvide,
    ErrorInterceptorProvider,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
