import { NotificationService } from './../notification.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, switchMap, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state(
        'hidden',
        style({
          opacity: 0,
          bottom: '0px',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          bottom: '30px',
        })
      ),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out')),
    ]),
  ],
})
export class SnackbarComponent implements OnInit {
  message: string;

  snackVisibility = 'hidden';

  constructor(private _notificationService: NotificationService) {}

  ngOnInit(): void {
    this._notificationService.notifier
      .pipe(
        tap((message) => {
          this.message = message;
          this.snackVisibility = 'visible';
        }),
        debounceTime(3000)
      )
      .subscribe(() => (this.snackVisibility = 'hidden'));
  }
}
