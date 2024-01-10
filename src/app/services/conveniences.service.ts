import { Injectable } from '@angular/core';
import { Conveniences } from '../shared/models/model';

@Injectable({
  providedIn: 'root'
})

export class ConveniencesService {

  conveniences: Conveniences[] = [];

  constructor() {
    this.getConveniences();
  }

  getConveniences() {
    this.conveniences = [
      { id: 1, name: 'wi-fi' },
      { id: 2, name: 'Cozinha' },
      { id: 3, name: 'Estacionamento' },
      { id: 4, name: 'Ar-condicionado' },
      { id: 5, name: 'Piscina' },
      { id: 6, name: 'Microondas' },
      { id: 7, name: 'Ventilador' },
      { id: 8, name: 'Banheira' },
      { id: 9, name: 'Mesa de trabalho' },
      { id: 10, name: 'Próximo a praia' },
      { id: 11, name: 'Tv a cabo' },
      { id: 12, name: 'Varanda' },
      { id: 13, name: 'Pets' }
    ]
  }
}
