import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/models/model';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  login!: Login;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  // dologin(email: string, password: string): Observable<HttpResponse<AuthResponse>> {
  //   return this.httpClient.post<AuthResponse>('apirUrl/', { email, password }, { observe: 'response' })
  //     .pipe(
  //       tap(response => {
  //         const authToken = response.body?.access_token || ''
  //         this.userService.saveToken(authToken)
  //       }))
  // }


  doLogin() {
    this.userService.saveToken(this.setToken())
  }

  setToken() {
    let token: {}
    return token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  }
}
