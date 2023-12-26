import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/shared/models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  login!: Login

  constructor(private loginService: LoginService, private router: Router) {
    this.login = {} as Login;
  }

  doLogin() {
    this.loginService.login = this.login;
    this.router.navigateByUrl('/home')
  }

}
