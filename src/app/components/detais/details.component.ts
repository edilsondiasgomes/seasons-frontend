import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
// import { Property } from './../../shared/models/model';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { Accommodation, Reservation } from './../../shared/models/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  accomodation!: Accommodation;
  reservation!: Reservation;
  minDate!: Date;

  private readonly MINIMUM_GUESTS = 1;


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

  constructor(private accommodationsService: AccommodationsService, private router: Router, private location: Location) { }

  ngOnInit(): void {

    this.accomodation = this.accommodationsService.accomodation

    this.reservation = {} as Reservation;
    this.reservation.accommodationId = this.accommodationsService.accomodation.id
    this.reservation.guests = this.MINIMUM_GUESTS;
    this.setMinDate();
    this.reservation.initialDate = new Date();
    this.reservation.finalDate = this.minDate;
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  setMinDate() {
    const oneDayFromTodayTimeStamp = new Date().getTime() + (1000 * 60 * 60 * 24);
    this.minDate = new Date(oneDayFromTodayTimeStamp)
  }

  requestReservation() {
    this.accommodationsService.reservation = this.reservation
    this.router.navigateByUrl('/reservation')
  }

  backDetais() {
    this.location.back();
  }

  verifyPetsAllowed(): boolean {
    return this.accomodation.conveniencesPlace.some(item => item.name === 'Pets')
  }

  verificarQuantasDiarias() {
    let diferenca = this.reservation.finalDate.getDate() - this.reservation.initialDate.getDate();

    this.reservation.quantityDaily = diferenca
    console.log(this.reservation.quantityDaily);

    this.calcularValorDiarias()
    return this.reservation.quantityDaily;
  }

  calcularValorDiarias() {
    this.reservation.totalDailyRate = this.accomodation.dailyRate * this.reservation.quantityDaily
  }

  calcularTaxaLimpeza() {
    this.reservation.totalCleaningFee = this.accomodation.cleaningFee * this.reservation.quantityDaily;
    return this.reservation.totalCleaningFee;
  }

  calcularValorTotal() {
    this.reservation.amount = this.reservation.totalCleaningFee + this.reservation.totalDailyRate;
    return this.reservation.amount;
  }

}
