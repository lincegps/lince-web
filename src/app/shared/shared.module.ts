import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDashboardComponent } from './components/card-dashboard/card-dashboard.component';
import { FormsModule } from '@angular/forms';
import { SnackbarComponent } from './components/messages/snackbar/snackbar.component';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [CardDashboardComponent, SnackbarComponent],
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  exports: [
    FormsModule,
    CardDashboardComponent,
    SnackbarComponent,
    NgxSpinnerModule,
  ],
})
export class SharedModule {}
