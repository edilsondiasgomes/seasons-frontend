import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeAccomodation } from '../../shared/models/model';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})

export class TypesService {

  private readonly URL = environment.URL

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/types`)
  }

}
