import { Component, OnInit } from '@angular/core';
import { InformationsService } from 'src/app/shared/informations.service';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  information: any;
  date!: Date;
  minDate = new Date();
  maxDate = new Date();
  hospedes = 1
  diarias!: number
  cleaningFee!: number;
  valorDiarias!: number;
  valorTotal!: number;

  constructor(private informationsService: InformationsService) { }

  ngOnInit(): void {
    this.information = this.informationsService.information
    console.log(this.information);
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  verificarQuantasDiarias() {
    let diferenca = this.maxDate.getTime() - this.minDate.getTime();
    let diarias = Math.floor(diferenca / (1000 * 60 * 60 * 24) + 1);
    this.diarias = diarias
    this.diariasVezesValor()
    return diarias;
  }

  diariasVezesValor() {
    this.valorDiarias = this.information.price * this.diarias
  }

  taxaLimpeza() {
    this.cleaningFee = this.information.cleaningFee * this.diarias;
    return this.cleaningFee;
  }

  calcularTotal() {
    return this.valorTotal = this.cleaningFee + this.valorDiarias
  }



}
