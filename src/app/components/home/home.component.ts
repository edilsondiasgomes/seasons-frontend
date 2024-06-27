import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { Accommodation, SearchFilter } from 'src/app/shared/models/model';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public accommodations!: Accommodation[];
  public spinnerOn = false;
  public responsiveOptions!: any[]

  constructor(
    private router: Router,
    private accommodationsService: AccommodationsService,
    private alertService: AlertService,
    private viacepService: ViacepService

  ) { }

  ngOnInit() {
    this.setResponsiveOptions();
    this.searchAccommodations();
    this.accommodationsService.receiveFindAccommodations().subscribe((item: SearchFilter) => { this.searchAccommodations(item) })
  }

  setResponsiveOptions() {
    this.responsiveOptions = [
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
  }

  public sendDetails(accomodation: Accommodation) {
    this.accommodationsService.accomodation = accomodation
    this.router.navigate(['details'])
  }

  private searchAccommodations(item?: SearchFilter) {
    this.accommodations = [];
    this.spinnerOn = true
    this.accommodationsService.getFilteredAccommodations(item)
      .subscribe({
        next: (success) => {
          this.accommodations = success;
          this.accommodationsService.accommodations = success;
        },
        error: (error) => {
          this.alertService.error(error, 'Atenção!')
        },
        complete: () => { this.spinnerOn = false }

      })
  }

}
