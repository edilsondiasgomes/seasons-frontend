import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Table } from 'primeng/table';
import { ReservationService } from 'src/app/core/services/reservation.service';
import { Reservation } from 'src/app/shared/models/model';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit {

  public reservations: Reservation[] = [];

  @ViewChild('inputDt') inputDt!: any

  constructor(private location: Location, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.listReservation()
  }

  public listReservation() {
    this.reservationService.listReservation()
      .subscribe({
        next: (data) => {
          this.reservations = data;
        },
        error: () => {

        }
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
