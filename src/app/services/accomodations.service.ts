import { Injectable } from '@angular/core';
import { Accomodation } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class AccomodationsService {

  accomodations!: Accomodation[];
  accomodation!: Accomodation;

  constructor() {
    this.getAccomodations();
  }

  private getAccomodations() {
    this.accomodations = this.accomodations = [
      {
        placeId: 1,
        mainImage: "../../../assets/images/vacations01.png",
        address: {
          street: 'Rua Abilio Diniz',
          number: 879,
          complement: 'ap 215',
          postalCode: '02500-000',
          city: 'Itapema',
          uf: 'SC',
          country: 'Brasil'
        },
        guestsAllowed: 10,
        guests: 0,
        checkIn: "15:00",
        checkOut: "12:00",
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
        conveniences: [
          { id: 1, name: 'wi-fi' },
          { id: 2, name: 'Cozinha' },
          { id: 3, name: 'Estacionamento' },
          { id: 4, name: 'Ar-condicionado' },
          { id: 6, name: 'Microondas' },
          { id: 8, name: 'Banheira' },
          { id: 9, name: 'Mesa de trabalho' },
          { id: 10, name: 'Próximo a praia' },
          { id: 11, name: 'Tv a cabo' },
          { id: 12, name: 'Varanda' },
          { id: 13, name: 'Pets' }
        ],
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
        address: {
          street: 'Rua José de Alencar',
          number: 352,
          complement: '',
          postalCode: '02500-000',
          city: 'Florianópolis',
          uf: 'SC',
          country: 'Brasil'
        },
        guestsAllowed: 5,
        guests: 0,
        checkIn: "16:00",
        checkOut: "20:00",
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
        conveniences: [
          { id: 1, name: 'wi-fi' },
          { id: 2, name: 'Cozinha' },
          { id: 4, name: 'Ar-condicionado' },
          { id: 5, name: 'Piscina' },
          { id: 6, name: 'Microondas' },
          { id: 7, name: 'Ventilador' },
          { id: 8, name: 'Banheira' },
          { id: 9, name: 'Mesa de trabalho' },
          { id: 10, name: 'Próximo a praia' },
          { id: 11, name: 'Tv a cabo' },
          { id: 13, name: 'Pets' }
        ],
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
      {
        placeId: 3,
        mainImage: "../../../assets/images/vacations03.png",
        address: {
          street: 'Rua Abilio Diniz',
          number: 879,
          complement: 'ap 215',
          postalCode: '02500-000',
          city: 'Itapema',
          uf: 'SC',
          country: 'Brasil'
        },
        guestsAllowed: 10,
        guests: 0,
        checkIn: "17:00",
        checkOut: "15:00",
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
        conveniences: [
          { id: 1, name: 'wi-fi' },
          { id: 2, name: 'Cozinha' },
          { id: 3, name: 'Estacionamento' },
          { id: 4, name: 'Ar-condicionado' },
          { id: 5, name: 'Piscina' },
          { id: 6, name: 'Microondas' },
          { id: 7, name: 'Ventilador' },
          { id: 8, name: 'Banheira' },
          { id: 9, name: 'Mesa de trabalho' },
          { id: 12, name: 'Varanda' },
        ],
        images: [
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
          {
            itemImage: '../../../assets/images/vacations02.png',
            alt: 'Description for Image 1',
          },
        ],

      },
      {
        placeId: 1,
        mainImage: "../../../assets/images/vacations04.png",
        address: {
          street: 'Rua José de Alencar',
          number: 352,
          complement: '',
          postalCode: '02500-000',
          city: 'Florianópolis',
          uf: 'SC',
          country: 'Brasil'
        },
        guestsAllowed: 10,
        guests: 0,
        checkIn: "20:00",
        checkOut: "16:00",
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
        conveniences: [
          { id: 1, name: 'wi-fi' },
          { id: 2, name: 'Cozinha' },
          { id: 3, name: 'Estacionamento' },
          { id: 4, name: 'Ar-condicionado' },
          { id: 7, name: 'Ventilador' },
          { id: 8, name: 'Banheira' },
          { id: 10, name: 'Próximo a praia' },
          { id: 11, name: 'Tv a cabo' },
          { id: 12, name: 'Varanda' },
          { id: 13, name: 'Pets' }
        ],
        images: [
          {
            itemImage: '../../../assets/images/vacations04.png',
            alt: 'Description for Image 1',
          },
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
        ],

      },
    ]
  }

}
