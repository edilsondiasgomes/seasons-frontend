import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccomodationsService } from 'src/app/services/accomodations.service';
import { Accomodation } from 'src/app/shared/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  accomodations!: Accomodation[];
  selectedAccomodation!: Accomodation
  date!: Date;
  minDate!: Date;
  maxDate!: Date;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private router: Router, private accomodationsService: AccomodationsService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.setInformations();
  }

  sendDetails(accomodation: Accomodation) {
    this.accomodationsService.accomodation = accomodation
    this.router.navigate(['details'])
  }

  private setInformations() {
    this.accomodations = this.accomodationsService.accomodations;
  }

}
