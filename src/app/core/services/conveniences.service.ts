import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convenience } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class ConveniencesService {

  private readonly URL = "http://localhost:3001"
  conveniences: Convenience[] = [];

  constructor(private httpClient: HttpClient) { }

  getConveniences(): Observable<Convenience[]> {
    return this.httpClient.get<Convenience[]>(`${this.URL}/conveniences`)
  }

}
