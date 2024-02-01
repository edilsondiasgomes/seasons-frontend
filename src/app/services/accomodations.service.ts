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

  public getDownloadPIX(): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ');
    headers.append('Content-Type', 'application/json');

    const bodi = {
      document: '39120653816',
      value: 15.54,
      personType: 'PF',
      name: 'Edilson Dias',
      bankId: 237,
      agency: 3183,
      agencyDigit: '',
      account: 1014254,
      accountDigit: '7',
      accountType: 'não',
      integrationId: '98af5da4-0324-4c31-a736-6be2b6ec1473',
      status: 'FINALIZADO',
      transactionCode: 'HGHDHDGHGHJFGHJFFJFJGKJGJHGJKGYHJHG',
      transferDate: '2023-11-23T15:36:42.411',
      scheduledReturn: 'retorno'
    }
    return this.httpClient.post<any>('http://35.247.249.223:9099/v1/reports/cashouts/pdf', bodi, { headers })
  }


}
