import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userSubject = new BehaviorSubject<any | null>(null)
  public user: any;

  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT()
    }
  }

  public isUserLogged() {
    return this.tokenService.hasToken()
  }

  public decodeJWT() {
    const token = this.tokenService.getToken()
    this.user = jwtDecode(token)
    this.userSubject.next(this.user);
  }

  public getUser() {
    return this.userSubject.asObservable();
  }

  public saveToken(token: string) {
    this.tokenService.saveToken(token)
    this.decodeJWT();
  }

  public logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
    this.user = '';
  }


}
