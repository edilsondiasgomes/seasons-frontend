import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'src/app/shared/informations.service';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
// import { Property } from './../../shared/models/model';
import { Property } from './../../shared/models/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})


export class DetailsComponent implements OnInit {

  property!: Property;
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

  constructor(private informationsService: InformationsService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.property = this.informationsService.property
    this.property.initialDate = new Date();
    this.property.finalDate = new Date();
    this.property.guests = 1
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  requestReservation() {
    this.router.navigateByUrl('/reservation')
    this.informationsService.property = this.property
  }

  backDetais() {
    this.location.back();
  }

  verificarQuantasDiarias() {
    let diferenca = this.property.finalDate.getTime() - this.property.initialDate.getTime();
    this.property.quantityDaily = Math.floor(diferenca / (1000 * 60 * 60 * 24) + 1);
    this.calcularValorDiarias()
    return this.property.quantityDaily;
  }

  calcularValorDiarias() {
    this.property.totalDailyRate = this.property.dailyRate * this.property.quantityDaily
  }

  calcularTaxaLimpeza() {
    this.property.totalCleaningFee = this.property.cleaningFee * this.property.quantityDaily;
    return this.property.totalCleaningFee;
  }

  calcularValorTotal() {
    this.property.amount = this.property.totalCleaningFee + this.property.totalDailyRate;
    return this.property.amount;
  }

}
