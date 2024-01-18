import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
// import { Property } from './../../shared/models/model';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { Accommodation } from './../../shared/models/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  accomodation!: Accommodation;
  date!: Date;

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
    this.accomodation.initialDate = new Date();
    this.accomodation.finalDate = new Date();
    this.accomodation.guests = 1
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  requestReservation() {
    this.accommodationsService.accomodation = this.accomodation
    this.router.navigateByUrl('/reservation')
  }

  backDetais() {
    this.location.back();
  }

  verificarQuantasDiarias() {
    let diferenca = this.accomodation.finalDate.getTime() - this.accomodation.initialDate.getTime();
    // console.log('Final Date', this.accomodation.finalDate.getTime(), 'Initial Date', this.accomodation.initialDate.getTime());

    // this.accomodation.quantityDaily = Math.floor(diferenca / (1000 * 60 * 60 * 24))
    this.accomodation.quantityDaily = Math.floor(diferenca / (1000 * 60 * 60 * 24) + 1);
    this.calcularValorDiarias()
    return this.accomodation.quantityDaily;
  }

  calcularValorDiarias() {
    this.accomodation.totalDailyRate = this.accomodation.dailyRate * this.accomodation.quantityDaily
  }

  calcularTaxaLimpeza() {
    this.accomodation.totalCleaningFee = this.accomodation.cleaningFee * this.accomodation.quantityDaily;
    return this.accomodation.totalCleaningFee;
  }

  calcularValorTotal() {
    this.accomodation.amount = this.accomodation.totalCleaningFee + this.accomodation.totalDailyRate;
    return this.accomodation.amount;
  }

}
