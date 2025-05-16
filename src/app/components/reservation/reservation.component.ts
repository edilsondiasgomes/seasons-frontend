import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { UserService } from 'src/app/core/services/user.service';
import { Accommodation, Reservation } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {

  private readonly CONVENIENCE_PETS = 'Pets'
  private readonly CONVENIENCE_PARKING = 'Estacionamento'
  accomodation!: Accommodation;
  reservation!: Reservation;
  cities!: City[];
  selectedCity!: City;
  text!: string

  constructor(
    private accommodationsService: AccommodationsService,
    private location: Location,
    private reservationService: ReservationService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.accomodation = this.accommodationsService.accomodation;
    this.reservation = this.accommodationsService.reservation;
    this.cities = [
      { name: 'PIX', code: 'NY' },
      { name: 'Cartão de crédito', code: 'RM' },
    ];
    console.log(this.accomodation);

  }

  backDetais() {
    this.location.back();
  }

  verifyPetsAllowed(): boolean {
    return this.accomodation.conveniencesPlace.some(item => item.name === this.CONVENIENCE_PETS)
  }

  verifyParking(): boolean {
    return this.accomodation.conveniencesPlace.some(item => item.name === this.CONVENIENCE_PARKING)
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  sendReservation() {
    this.alertService.confirm('Quer concluir a a reserva para essa acomodação?', 'Atenção!', () => {
      const userId = this.userService.user.userId
      const reservation = { ...this.reservation, userId }

      this.reservationService.createReservation(reservation)
        .subscribe(
          {
            next: (success) => {
              this.alertService.success('Sua reserva foi feita com sucesso!')
            },
            error: (error) => {
              this.alertService.error('Erro ao fazer sua reserva!')
            }
          })
    })
  }

}
