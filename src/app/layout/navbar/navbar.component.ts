import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../core/security/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private _tokenService: TokenService, private _router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this._tokenService.removeToken();
    setTimeout(() => {
      this._router.navigate(['login']);
    }, 300);
  }
}
