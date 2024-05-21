import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private readonly URL = "http://localhost:3000"
  registrations: Registration[] = [];
  register!: Registration;

  constructor(private httpClient: HttpClient) { }

  getRegistrations(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(`${this.URL}/registrations`)
  }

  setRegistrations(registration: Registration): Observable<Registration> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Registration>(`${this.URL}/registrations`, registration, { headers })
  }

  deleteRegistration(id: number): Observable<Registration> {
    return this.httpClient.delete<Registration>(`${this.URL}/registrations/${id}`)
  }

}
