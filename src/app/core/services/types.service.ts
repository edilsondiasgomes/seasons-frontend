import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeAccomodation } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class TypesService {

  private readonly URL = "http://localhost:3001"

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/types`)
  }

}
