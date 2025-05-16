import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration } from '../../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private readonly URL = "http://localhost:3001"
  registrations: Registration[] = [];
  register!: Registration;

  constructor(private httpClient: HttpClient) { }

  getRegistrations(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(`${this.URL}/registrations`)
  }

  getRegistrationByID(id: number): Observable<Registration> {
    return this.httpClient.get<Registration>(`${this.URL}/registrations/${id}`)
  }

  createRegistration(registration: Registration): Observable<Registration> {
    return this.httpClient.post<Registration>(`${this.URL}/registrations/insert`, registration)
  }

  updateRegistration(registration: Registration): Observable<Registration> {
    return this.httpClient.put<Registration>(`${this.URL}/registrations/update/${registration.id}`, registration)
  }

  deleteRegistration(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}/registrations/${id}`)
  }

}
