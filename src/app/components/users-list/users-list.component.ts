import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AlertService } from 'src/app/services/alert.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { Registration } from 'src/app/shared/models/model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  registrations!: Registration[]

  @ViewChild('inputDt') inputDt!: any

  constructor(
    private location: Location,
    private registrationService: RegistrationService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRegistrations()
  }

  toGoBack() {
    this.location.back();
  }

  getRegistrations() {
    this.registrationService.getRegistrations()
      .subscribe({
        next: (data) => {
          this.registrations = data
        },
        error: () => {

        }
      })
  }

  onDelete(id: number) {
    this.alertService.confirm('Deseja excluir o item selecionado?', '', () => {
      this.registrationService.deleteRegistration(id)
        .subscribe({
          next: () => {
            this.alertService.success('Registro excluído com sucesso!')
            this.getRegistrations()
          },
          error: () => {
            this.alertService.error('Erro ao excluir registro!')
          }
        })
    })
  }

  onEdit(register: Registration) {
    this.registrationService.register = register;
    this.router.navigateByUrl('/users-list/' + register.id)
  }

  clear(table: Table) {
    table.clear();
    this.inputDt.nativeElement.value = ''
  }

}
