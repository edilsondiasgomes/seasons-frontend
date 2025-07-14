import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convenience } from '../../shared/models/model';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})

export class ConveniencesService {

  private readonly URL = environment.apiURL
  conveniences: Convenience[] = [];

  constructor(private httpClient: HttpClient) { }

  getConveniences(): Observable<Convenience[]> {
    return this.httpClient.get<Convenience[]>(`${this.URL}/conveniences`)
  }

}
