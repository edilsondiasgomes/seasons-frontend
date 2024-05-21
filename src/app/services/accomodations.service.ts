import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Accommodation, Reservation } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {

  private readonly URL = "http://localhost:3000"
  public accommodations!: Accommodation[];
  public accomodation!: Accommodation;
  public reservation!: Reservation;
  public subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  searchFromHeader() {
    this.subject.next('');
  }

  receiveSearchFromHeader() {
    return this.subject.asObservable();
  }

  public getFilteredAccommodations(city?: string, initialDate?: Date, finalDate?: Date, guests?: number): Observable<Accommodation[]> {
    // const queryParams = '?city=' + city + '&initialDate=' + initialDate + '&finalDate=' + finalDate + '&guests=' + guests;

    let queryParams = '';
    queryParams += city ? `city=${city}&` : '';
    queryParams += initialDate ? `initialDate=${initialDate.toISOString()}&` : '';
    queryParams += finalDate ? `finalDate=${finalDate.toISOString()}&` : '';
    queryParams += guests ? `guests=${guests.toString()}` : '';
    queryParams.endsWith('&') ? queryParams.slice(0, -1) : queryParams;

    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations${queryParams ? '?' + queryParams : ''}`)
  }

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
