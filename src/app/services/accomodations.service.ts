import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {

  private readonly URL = "http://localhost:3000"
  public accommodations!: Accommodation[];
  public accomodation!: Accommodation;

  constructor(private httpClient: HttpClient) { }

  public getAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations`)
  }

  public postAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Accommodation>(`${this.URL}/accommodations`, accomodation, { headers })
  }

  public putAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Accommodation>(`${this.URL}/accommodations/${accomodation.id}`, accomodation, { headers })
  }

  public deleteAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.delete<Accommodation>(`${this.URL}/accommodations/${id}`)
  }



}
