import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeAccomodation } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class TypesService {

  private readonly URL = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<TypeAccomodation[]> {
    return this.httpClient.get<TypeAccomodation[]>(`${this.URL}/types`)
  }

}
