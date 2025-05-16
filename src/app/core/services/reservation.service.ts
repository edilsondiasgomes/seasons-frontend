import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  private readonly URL = "http://localhost:3001"

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${this.URL}/reservations/`, reservation)
  }
 

}
