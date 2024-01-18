import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conveniences } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class ConveniencesService {

  private readonly URL = "http://localhost:3000"
  conveniences: Conveniences[] = [];

  constructor(private httpClient: HttpClient) { }

  getConveniences(): Observable<Conveniences[]> {
    return this.httpClient.get<Conveniences[]>(`${this.URL}/conveniences`)
  }

}
