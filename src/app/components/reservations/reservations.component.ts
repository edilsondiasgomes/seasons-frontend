import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Table } from 'primeng/table';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Accommodation, Reservation } from 'src/app/shared/models/model';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/core/services/user.service';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetaisDialogComponent } from '../detais-dialog/detais-dialog.component';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit {

  public reservations: Reservation[] = [];
  public blockedPage = false;
  public accommodationSelected!: Accommodation;
  ref!: DynamicDialogRef;

  @ViewChild('inputDt') inputDt!: any

  constructor(private alertService: AlertService, private dialogService: DialogService, private accommodationsService: AccommodationsService, private userService: UserService, private location: Location, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.listReservations()
  }

  public listReservations() {
    this.blockedPage = true;
    this.reservationService.getReservations(this.userService.isUserMaster, this.userService.user.userId)
      .subscribe({
        next: (data) => {
          this.blockedPage = false;
          this.reservations = data;
        },
        error: () => {
          this.blockedPage = false;
        }
      })
  }

  public getReservationByID(accommodationId: number) {
    this.blockedPage = true;
    this.accommodationsService.getFilteredAccommodations(undefined, accommodationId)
      .subscribe({
        next: (data) => {
          this.accommodationSelected = data[0];
          this.openDialogDetails()

          this.blockedPage = false;
        },
        error: () => {
          this.blockedPage = false;
        }
      })

  }

  private openDialogDetails() {
    this.ref = this.dialogService.open(DetaisDialogComponent, {
      data: this.accommodationSelected,
      header: 'Detalhes',
      width: '80%',
    })
  }

  public deleteReservation(reservation: Reservation) {
    this.alertService.confirm('Tem certeza que deseja excluir essa reserva', 'Atenção!', () => {
      this.blockedPage = true;
      this.reservationService.deleteReservation(reservation.registrationId)
        .subscribe({
          next: (data) => {
            this.blockedPage = false;
            this.alertService.success('Reserva excluída com sucesso!');
            this.listReservations();
          },
          error: (error) => {
            this.blockedPage = false;
            this.alertService.error(error)
          }
        })
    })
  }

  toGoBack() {
    this.location.back();
  }

  clear(table: Table) {
    table.clear();
    this.inputDt.nativeElement.value = ''
  }
}
