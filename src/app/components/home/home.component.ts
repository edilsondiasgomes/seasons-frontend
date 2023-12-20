import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'src/app/shared/informations.service';
import { Property } from 'src/app/shared/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  properties!: Property[];
  selectedInformations: any
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

  constructor(private router: Router, private informationsService: InformationsService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.setInformations();
  }

  sendDetails(information: any) {
    this.router.navigate(['details'])
    this.informationsService.property = information
  }

  private setInformations() {
    this.properties = [
      {
        placeId: 1,
        mainImage: "../../../assets/images/vacations01.png",
        stateUF: "Itapema, SC, Brasil",
        guestsAllowed: 10,
        guests: 0,
        checkIn: 15,
        checkOut: 12,
        initialDate: new Date(),
        finalDate: new Date(),
        petsAllowed: false,
        parking: true,
        rooms: 3,
        toilets: 2,
        dailyRate: 399.00,
        totalDailyRate: 0,
        quantityDaily: 0,
        description: 'A casa da ilha foi inspirada nas cabanas americanas e canadenses. Um encontro lindo da natureza com a Arquitetura. Feita toda em madeira rústica, e decorada com todo luxo e design para que o hospede tenha uma experiência inesquecível com requinte e aconchego. ',
        title: 'Casa na ilha',
        cleaningFee: 50,
        totalCleaningFee: 0,
        amount: 0,
        conveniences: ['wi-fi', 'Cozinha', 'Estacionamento', 'Ar-condicionado', 'Piscina', 'Microondas', 'Ventilador', 'Banheira', 'Mesa de trabalho', 'Próximo a praia', 'Tv a cabo', 'Varanda', 'Pets'],
        images: [
          {
            itemImage: '../../../assets/images/vacations01.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations02.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations03.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations04.png',
            alt: 'Description for Image 1',
          },
        ],

      },
      {
        placeId: 2,
        mainImage: "../../../assets/images/vacations02.png",
        stateUF: "Florianópolis, SC, Brasil",
        guestsAllowed: 5,
        guests: 0,
        checkIn: 12,
        checkOut: 20,
        initialDate: new Date(),
        finalDate: new Date(),
        petsAllowed: false,
        parking: true,
        rooms: 4,
        toilets: 2,
        dailyRate: 299.00,
        totalDailyRate: 0,
        quantityDaily: 0,
        description: 'A casa da ilha foi inspirada nas cabanas americanas e canadenses. Um encontro lindo da natureza com a Arquitetura. Feita toda em madeira rústica, e decorada com todo luxo e design para que o hospede tenha uma experiência inesquecível com requinte e aconchego. ',
        title: 'Casa em Floripa',
        cleaningFee: 40,
        totalCleaningFee: 0,
        amount: 0,
        conveniences: ['wi-fi', 'Cozinha', 'Estacionamento', 'Ar-condicionado', 'Piscina', 'Microondas', 'Ventilador', 'Banheira', 'Mesa de trabalho', 'Próximo a praia', 'Tv a cabo', 'Varanda', 'Pets'],
        images: [
          {
            itemImage: '../../../assets/images/vacations02.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations03.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations04.png',
            alt: 'Description for Image 1',
          },
          {
            itemImage: '../../../assets/images/vacations01.png',
            alt: 'Description for Image 1',
          },
        ],

      },
    ]
  }

}
