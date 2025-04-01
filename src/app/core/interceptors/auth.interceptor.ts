import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.tokenService.hasToken()) {

      const token = this.tokenService.getToken()

      if (request.body instanceof FormData) {
        request = request.clone({
          setHeaders: { 'Authorization': `Bearer ${token}` }
        })
      } else {
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      }
    }
    return next.handle(request);

  }
}
