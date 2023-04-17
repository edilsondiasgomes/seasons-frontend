import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  informations: any;

  constructor() { }

  ngOnInit() {
    this.setInformations();
  }

  private setInformations() {
    this.informations = [
      {
        src: "../../../assets/images/vacations01.png",
        stateUF: "Itapema, SC, Brasil",
        hospedes: 10,
        room: 3,
        toilet: 2,
        price: 399.00
      },
      {
        src: "../../../assets/images/vacations02",
        stateUF: "Blumenau, SC, Brasil",
        hospedes: 7,
        room: 6,
        toilet: 4,
        price: 585.00
      },
      {
        src: "../../../assets/images/vacations03.png",
        stateUF: "Itajaí, SC, Brasil",
        hospedes: 12,
        room: 5,
        toilet: 3,
        price: 740.00
      },
      {
        src: "../../../assets/images/vacations04.png",
        stateUF: "Florianópolis, SC, Brasil",
        hospedes: 6,
        room: 2,
        toilet: 2,
        price: 980.00
      }
    ]
  }

}
