import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'src/app/shared/informations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  informations!: any[];
  selectedInformations: any
  date!: Date;
  minDate!: Date;
  maxDate!: Date;

  constructor(private router: Router, private informationsService: InformationsService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.setInformations();
  }

  sendDetails(information: any) {
    this.router.navigate(['details'])
    this.informationsService.information = information
  }

  private setInformations() {
    this.informations = [
      {
        src: "../../../assets/images/vacations01.png",
        stateUF: "Itapema, SC, Brasil",
        hospedes: 10,
        room: 3,
        toilet: 2,
        price: 399.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Linda casa na ilha!',
        cleaningFee: 50,
        conveniences: ['wi-fi', 'Cozinha', 'Estacionamento', 'Ar-condicionado', 'Piscina', 'Microondas', 'Ventilador', 'Banheira', 'Mesa de trabalho', 'Próximo a praia', 'Tv a cabo', 'Varanda']

      },
      {
        src: "../../../assets/images/vacations02",
        stateUF: "Blumenau, SC, Brasil",
        hospedes: 7,
        room: 6,
        toilet: 4,
        price: 585.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Sobrado em Blumenau!',
        cleaningFee: 75,
        conveniences: ['wi-fi', 'Cozinha', 'Ventilador', 'Mesa de trabalho', 'Próximo a praia', 'Tv a cabo']

      },
      {
        src: "../../../assets/images/vacations03.png",
        stateUF: "Itajaí, SC, Brasil",
        hospedes: 12,
        room: 5,
        toilet: 3,
        price: 740.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Quarto com vista para o mar!',
        cleaningFee: 65
      },
      {
        src: "../../../assets/images/vacations04.png",
        stateUF: "Florianópolis, SC, Brasil",
        hospedes: 6,
        room: 2,
        toilet: 2,
        price: 980.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Chalé na beira da piscina!',
        cleaningFee: 65
      },
      {
        src: "../../../assets/images/vacations04.png",
        stateUF: "Florianópolis, SC, Brasil",
        hospedes: 6,
        room: 2,
        toilet: 2,
        price: 980.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Linda casa na ilha!'
      },
      {
        src: "../../../assets/images/vacations03.png",
        stateUF: "Itajaí, SC, Brasil",
        hospedes: 12,
        room: 5,
        toilet: 3,
        price: 740.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Linda casa na ilha!'
      },
      {
        src: "../../../assets/images/vacations02",
        stateUF: "Blumenau, SC, Brasil",
        hospedes: 7,
        room: 6,
        toilet: 4,
        price: 585.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Linda casa na ilha!',
        cleaningFee: 50
      },
      {
        src: "../../../assets/images/vacations01.png",
        stateUF: "Itapema, SC, Brasil",
        hospedes: 10,
        room: 3,
        toilet: 2,
        price: 399.00,
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
        title: 'Linda casa na ilha!'
      },
    ]
  }

}
