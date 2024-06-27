import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { UserService } from 'src/app/core/services/user.service';
import { Login } from 'src/app/shared/models/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  login!: Login

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {
    this.login = {} as Login;
  }

  doLogin() {
    this.loginService.doLogin();
    this.router.navigateByUrl('/')
    this.userService.getUser().subscribe(user => console.log(user))
  }

  goToRegistration() {
    this.router.navigateByUrl('/registration')
  }

}
