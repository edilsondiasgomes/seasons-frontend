import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { Registration } from 'src/app/shared/models/model';

@Component({
  selector: 'app-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  private readonly IDADE_MINIMA = 18;
  private readonly COUNTRY = 'Brasil'
  dataMinima = new Date();
  finalDate = new Date(this.dataMinima.getFullYear() - this.IDADE_MINIMA, this.dataMinima.getMonth(), this.dataMinima.getDate());
  registrationForm!: FormGroup
  register!: Registration

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.register = this.registrationService.register

    this.createForm();
  }

  toGoBack() {
    this.location.back();
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      name: [this.register?.name ?? '', Validators.required],
      cpf: [this.register?.cpf ?? '', Validators.required],
      birthday: [this.register?.birthday ?? '', Validators.required],
      address: this.formBuilder.group({
        street: [this.register?.address?.street ?? '', Validators.required],
        number: [this.register?.address?.number ?? '', Validators.required],
        complement: [this.register?.address?.complement ?? ''],
        district: [this.register?.address?.district ?? '', Validators.required],
        postalCode: [this.register?.address?.postalCode ?? '', Validators.required],
        city: [this.register?.address?.city ?? '', Validators.required],
        uf: [this.register?.address?.uf.toUpperCase() ?? ''?.toUpperCase(), Validators.required],
        country: [this.COUNTRY]
      }),

    })

  }

  private validateForm() {
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.get(field)
      control?.markAsDirty()
      control?.markAsTouched();
    })

    const address = this.registrationForm.get('address') as FormGroup
    Object.keys(address.controls).forEach(field => {
      const control = address.get(field)
      control?.markAsDirty()
      control?.markAsTouched();
    })

  }
  save() {
    this.validateForm();
    if (!this.registrationForm.valid) {
      return this.alertService.info('Prencha os campos obrigatórios')
    } else {
      this.registrationService.setRegistrations(this.registrationForm.value)
        .subscribe({
          next: () => {
            this.createForm();
            this.alertService.success('Registro salvo com sucesso!')
          },
          error: () => {
            this.alertService.error('Erro ao salvar o registro!')
          }
        })
    }


  }
}

