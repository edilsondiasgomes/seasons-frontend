import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Accommodation, Reservation, SearchFilter } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class AccommodationsService {

  private readonly URL = "http://localhost:3001"
  // private readonly URL = "https://json-server-nine-zeta.vercel.app/api"
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
    queryParams += item?.inputSearch ? `city=${item.inputSearch}&` : '';
    queryParams += item?.minDate ? `initialDate=${item.minDate.toISOString()}&` : '';
    queryParams += item?.maxDate ? `finalDate=${item.maxDate.toISOString()}&` : '';
    queryParams += item?.guests ? `guestsAllowed=${item.guests.toString()}` : '';
    queryParams.endsWith('&') ? queryParams = queryParams.slice(0, -1) : queryParams;

    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations${queryParams ? '?' + queryParams : ''}`)
  }

  public getAccommodations(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(`${this.URL}/accommodations`)
  }

  public postAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    const formData = new FormData();

    for (const [key, value] of Object.entries(accomodation)) {

      if (key === 'conveniencesPlace') {
        formData.append(key, JSON.stringify(value))

      }

      else if (key === 'files') {
        value.forEach((item: any, index: number) => {
          formData.append(key, item)
        })

      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())

      } else {
        formData.append(key, value as string)
      }
    }

    return this.httpClient.post<Accommodation>(`${this.URL}/accommodations`, formData)
  }

  public putAccommodation(accomodation: Accommodation): Observable<Accommodation> {
    const formData = new FormData();

    for (const [key, value] of Object.entries(accomodation)) {

      if (key === 'conveniencesPlace') {
        formData.append(key, JSON.stringify(value))
      }

      else if (key === 'files') {
        value.forEach((item: any, index: number) => {
          
          if (item.id) {
            formData.append(key, JSON.stringify(item))
          } else {
            formData.append(key, item)
          }
        })

      } else if (value instanceof Date) {
        formData.append(key, value.toISOString())

      } else {
        formData.append(key, value as string)
      }
      

    }
    return this.httpClient.put<Accommodation>(`${this.URL}/accommodations/${accomodation.id}`, formData)
  }

  public deleteAccommodation(accomodation: Accommodation): Observable<any> {
    return this.httpClient.put<any>(`${this.URL}/accommodations/delete/${accomodation.id}`, accomodation)
  }

}
