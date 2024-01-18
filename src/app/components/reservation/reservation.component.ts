import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { Accommodation } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  accomodation!: Accommodation;
  cities!: City[];
  selectedCity!: City;
  text!: string

  constructor(private accommodationsService: AccommodationsService, private location: Location) { }

  ngOnInit(): void {
    this.accomodation = this.accommodationsService.accomodation;
    this.cities = [
      { name: 'PIX', code: 'NY' },
      { name: 'Cartão de crédito', code: 'RM' },
    ];
  }

  backDetais() {
    this.location.back();
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

}
