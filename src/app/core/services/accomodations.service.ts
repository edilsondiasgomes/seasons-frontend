import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Accommodation, Reservation, SearchFilter } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {

  // private readonly URL = "http://localhost:3000"
  private readonly URL = "https://json-server-nine-zeta.vercel.app/api"
  public accommodations!: Accommodation[];
  public accomodation!: Accommodation;
  public reservation!: Reservation;
  public subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  findAccommodations(searchFilter?: SearchFilter) {
    this.subject.next(searchFilter);
  }

  receiveFindAccommodations() {
    return this.subject.asObservable();
  }

  public getFilteredAccommodations(item?: SearchFilter): Observable<Accommodation[]> {
    let queryParams = '';
    queryParams += item?.inputSearch ? `title=${item.inputSearch}&` : '';
    queryParams += item?.minDate ? `initialDate=${item.minDate.toISOString()}&` : '';
    queryParams += item?.maxDate ? `finalDate=${item.maxDate.toISOString()}&` : '';
    queryParams += item?.guests ? `guests=${item.guests.toString()}` : '';
    queryParams.endsWith('&') ? queryParams = queryParams.slice(0, -1) : queryParams;

    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations${queryParams ? '?' + queryParams : ''}`)
  }

  public getAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations`)
  }

  public postAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(`${this.URL}/accommodations`, accomodation)
  }

  public putAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(`${this.URL}/accommodations/${accomodation.id}`, accomodation)
  }

  public deleteAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.delete<Accommodation>(`${this.URL}/accommodations/${id}`)
  }

}
