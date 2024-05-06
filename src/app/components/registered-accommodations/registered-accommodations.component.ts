import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { AlertService } from './../../services/alert.service';
import { Accommodation } from './../../shared/models/model';

@Component({
  selector: 'app-registered-accommodations',
  templateUrl: './registered-accommodations.component.html',
  styleUrls: ['./registered-accommodations.component.scss']
})

export class RegisteredAccommodationsComponent implements OnInit {

  accommodations!: Accommodation[];
  @ViewChild('inputDt') inputDt!: any

  constructor(
    private location: Location,
    private accommodationsService: AccommodationsService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getaccommodations();
  }

  toGoBack() {
    this.location.back();
  }

  clear(table: Table) {
    table.clear();
    this.inputDt.nativeElement.value = ''
  }

  private getaccommodations() {
    this.accommodationsService.getAccommodations()
      .subscribe({
        next: (success) => {
          this.accommodations = success;
        },
        error: (error) => {
          this.alertService.error(error, 'Atenção!')
        }
      })
  }


  onEdit(accommodation: Accommodation) {
    this.accommodationsService.accomodation = accommodation
    this.router.navigateByUrl('/register-accomodation/' + accommodation.id)
  }

  onDelete(id: number) {
    this.alertService.confirm('Tem certeza que deseja excluir essa acomodação?', 'Atenção!',
      () => {
        this.accommodationsService.deleteAccommodation(id)
          .subscribe({
            next: () => {
              this.alertService.success('acomodação excluída com sucesso!')
              this.getaccommodations();
            },
            error: (error) => {
              this.alertService.error(error)
            }
          })
      })
  }
}
