import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { AlertService } from '../../core/services/alert.service';
import { Accommodation } from '../../shared/models/model';

@Component({
  selector: 'app-accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.scss']
})

export class AccommodationsListComponent implements OnInit {

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

  onPause(id: number) {
    this.alertService.info('Funcionalidade ainda não implementada')
  }

  onEdit(accommodation: Accommodation) {
    this.accommodationsService.accomodation = accommodation
    this.router.navigateByUrl('/accomodation-registration/' + accommodation.id)
  }

  onDelete(accommodation: Accommodation) {
    this.alertService.confirm('Tem certeza que deseja excluir essa acomodação?', 'Atenção!',
      () => {
        this.accommodationsService.deleteAccommodation(accommodation)
          .subscribe({
            next: (success) => {
              this.alertService.success('acomodação excluída com sucesso!')
              this.getaccommodations();
            },
            error: (error) => {
              console.log(error);
              this.alertService.error(error)
            }
          })
      })
  }
}
