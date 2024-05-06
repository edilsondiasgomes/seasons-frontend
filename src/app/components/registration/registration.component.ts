import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  idadeMinima = new Date();
  finalDate = new Date(this.idadeMinima.getFullYear() - 18, this.idadeMinima.getMonth(), this.idadeMinima.getDate());
  registrationForm!: FormGroup

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  toGoBack() {
    this.location.back();
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      birthday: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        district: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        uf: [''?.toUpperCase(), Validators.required],
        country: ['Brasil']
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
      this.alertService.success('Formulário válido')
      console.log(this.registrationForm.value);
    }


  }
}

