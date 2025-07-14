import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../shared/models/model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private readonly URL = environment.apiURL

  constructor(private httpClient: HttpClient) { }

  public createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.URL}/reservations/`, reservation)
  }

   public getReservations(isUserMaster: boolean, userId?: number): Observable<Reservation[]> {
    if (isUserMaster) {
      return this.httpClient.get<Reservation[]>(`${this.URL}/reservations`)
    } else {
      return this.httpClient.get<Reservation[]>(`${this.URL}/reservations/user/${userId}`)
    }
  }

  public getReservationByAccommodation(accommodationId: number): Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/reservations/accommodation/${accommodationId}`)
  }

 
  public deleteReservation(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}/reservations/${id}`)
  }


}
