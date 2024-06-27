import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, first } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
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
  blockedPage!: boolean;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registrationService: RegistrationService,
    private viaCepService: ViacepService
  ) { }

  ngOnInit(): void {
    this.register = this.registrationService.register
    this.createForm();
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

  public findCEP() {
    const cep = this.registrationForm.get('address.postalCode')?.value
    if (cep && cep.length >= 8) {
      this.blockedPage = true;
      this.viaCepService.getCEP(cep)
        .pipe(
          first(),
          finalize(() => {
            this.blockedPage = false
          }))
        .subscribe({
          next: (success) => {
            this.updateAddress(success)
            if (success.erro) {
              this.alertService.info('O CEP digitado não existe!')
            }
          },
          error: (error) => { this.alertService.error(error, 'Atenção!') }
        })
    }
  }

  private updateAddress(endereco: any) {
    this.registrationForm.get('address')?.patchValue({
      street: endereco.logradouro,
      district: endereco.bairro,
      postalCode: endereco.cep,
      city: endereco.localidade,
      uf: endereco.uf?.toUpperCase(),
    });
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
  public save() {
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

  public toGoBack() {
    this.location.back();
  }
}

