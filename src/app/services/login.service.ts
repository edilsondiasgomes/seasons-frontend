import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login!: Login;

  constructor() { }
}
