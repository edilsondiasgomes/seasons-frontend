import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccomodationsService } from 'src/app/services/accomodations.service';
import { Accomodation } from './../../shared/models/model';

@Component({
  selector: 'app-registered-accommodations',
  templateUrl: './registered-accommodations.component.html',
  styleUrls: ['./registered-accommodations.component.scss']
})
export class RegisteredAccommodationsComponent implements OnInit {

  accomodations!: Accomodation[];

  constructor(private location: Location, private accomodationsService: AccomodationsService, private router: Router) { }

  ngOnInit(): void {
    this.getAccomodations();
  }


  toGoBack() {
    this.location.back();
  }

  getAccomodations() {
    this.accomodations = this.accomodationsService.accomodations;
  }

  edit(accomodation: Accomodation) {
    this.accomodationsService.accomodation = accomodation
    this.router.navigateByUrl('/register-accomodation/' + accomodation.placeId)
  }

}
