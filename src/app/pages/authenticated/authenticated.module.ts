import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { AuthenticatedComponent } from './authenticated.component';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [AuthenticatedComponent],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    LayoutModule,
    SharedModule,
    CoreModule,
  ],
})
export class AuthenticatedModule {}
