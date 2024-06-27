import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  // private readonly API_URL = environment.apiViaCEP;
  private readonly API_URL = 'https://viacep.com.br/ws/';

  constructor(private httpClient: HttpClient) { }

  getCEP(cep: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${cep}/json`)
  }


}
