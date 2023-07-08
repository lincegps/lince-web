import { NotificationService } from './../../shared/components/messages/notification.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/security/auth/auth.service';
import { CredenciaisDTO } from '../../models/credenciais-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  navigateTo: string;

  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: this._fb.control('', [Validators.required]),
      password: this._fb.control('', [Validators.required]),
    });
    this.navigateTo = this._activatedRouter.snapshot.params['to'] || btoa('/');
  }

  login(): void {
    this._authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (response: HttpResponse<string>) => {
          this._authService.successfulLogin(response);
          this._notificationService.notify(
            `Bem vindo, ${this._authService.username}`
          );
        },
        (response: HttpErrorResponse) => {
          if (response.status !== 403) {
            this._notificationService.notify(response.message);
          }
        }
      )
      .add(() => this._router.navigate([atob(this.navigateTo)]));
  }
}
