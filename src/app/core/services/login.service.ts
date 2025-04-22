import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/models/model';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  access_token: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly URL = "http://localhost:3001"
  private login!: Login;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  doLogin(login: Login): Observable<any> {
    
    return this.httpClient.post<any>(this.URL+'/registrations/login', login, { observe: 'response' })
      .pipe(
        tap(response => {
          const authToken = response.body?.access_token || ''
          this.userService.saveToken(authToken)
          
        }))
  }

}
