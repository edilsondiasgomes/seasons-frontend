import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { Accommodation } from 'src/app/shared/models/model';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  accommodations!: Accommodation[];
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

  constructor(
    private router: Router,
    private accommodationsService: AccommodationsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.searchAccommodations();
    this.accommodationsService.receiveSearchFromHeader().subscribe(() => { this.searchAccommodations() })
  }

  sendDetails(accomodation: Accommodation) {
    this.accommodationsService.accomodation = accomodation
    this.router.navigate(['details'])
  }

  private searchAccommodations() {
    this.accommodations = [];
    this.accommodationsService.getAccommodations()
      .subscribe({
        next: (success) => {
          this.accommodations = success;
          this.accommodationsService.accommodations = success;
        },
        error: (error) => {
          this.alertService.error(error, 'Atenção!')
        }
      })
  }

}
