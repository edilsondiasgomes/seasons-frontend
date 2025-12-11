import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { Accommodation, Reservation } from './../../shared/models/model';
import { ReservationService } from 'src/app/core/services/reservation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  private readonly MINIMUM_GUESTS = 1;
  accomodation!: Accommodation;
  reservation!: Reservation;
  minDate!: Date;
  minFinalDate!: Date
  disabledDates: Date[] = [];

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
    private accommodationsService: AccommodationsService,
    private router: Router,
    private location: Location,
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.reservation = {} as Reservation;
    this.accomodation = this.accommodationsService.accomodation
    this.reservation.accommodationId = this.accommodationsService.accomodation.id
    this.reservation.guests = this.MINIMUM_GUESTS;
    this.setMinDate();
    this.reservation.initialDate = new Date();
    this.reservation.finalDate = this.minDate;
    this.setDisabledDates()
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  setMinDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1)
    this.minDate = new Date(date);
  }

  getFinalminDate() {
    const initial = new Date(this.reservation.initialDate)
    initial.setDate(initial.getDate() + 1)
    this.minFinalDate = new Date(initial)
    this.reservation.finalDate = this.minFinalDate
  }

  setDisabledDates() {
    this.reservationService.getReservationByAccommodation(this.accomodation.id)
      .subscribe({
        next: (success) => {
          const dates = success;
          this.disabledDates = dates.map((d: any) => new Date(d))
          console.log(this.disabledDates);
          
        },
        error: () => { }
      })
  }

  checkPetsAllowed(): boolean {
    return this.accomodation?.conveniencesPlace?.some(item => item.name === 'Pets')
  }

  checkDaily() {
    let diferenca = this.reservation.finalDate.getDate() - this.reservation.initialDate.getDate();
    this.reservation.quantityDaily = diferenca
    this.calculateDailyRates()
    return this.reservation.quantityDaily;
  }

  calculateDailyRates() {
    this.reservation.totalDailyRate = this.accomodation.dailyRate * this.reservation.quantityDaily
  }

  calculateCleaningFee() {
    this.reservation.totalCleaningFee = this.accomodation.cleaningFee * this.reservation.quantityDaily;
    return this.reservation.totalCleaningFee;
  }

  calculateTotalValue() {
    this.reservation.amount = this.reservation.totalCleaningFee + this.reservation.totalDailyRate;
    return this.reservation.amount;
  }

  requestReservation() {
    this.accommodationsService.reservation = this.reservation
    this.router.navigateByUrl('/reservation')
  }

  backDetais() {
    this.location.back();
  }
}
