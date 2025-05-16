import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { Registration } from 'src/app/shared/models/model';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  private readonly IDADE_MINIMA = 18;
  private readonly COUNTRY = 'Brasil'
  private dataMinima = new Date();
  private register!: Registration
  public finalDate = new Date(this.dataMinima.getFullYear() - this.IDADE_MINIMA, this.dataMinima.getMonth(), this.dataMinima.getDate());
  public registrationForm!: FormGroup
  public blockedPage!: boolean;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private registrationService: RegistrationService,
    private viaCepService: ViacepService,
    private router: Router,
    private accommodationsService: AccommodationsService,
    private userService: UserService
  ) { }

  ngOnDestroy(): void {
    this.registrationForm.reset();
  }

  ngOnInit(): void {
    this.register = {} as Registration;
    this.getRegistration();
    this.createForm();
  }

  private getRegistration() {
    const user = this.userService.user?.userId
    if (user) {

      this.registrationService.getRegistrationByID(this.userService.user.userId)
        .subscribe({
          next: (data) => {
            if (data) {
              this.register = data;
              this.createForm();
            }
          },
          error: (error) => {
            this.alertService.error('Erro ao buscar registro!')
          },
        })
    }
  }

  private createForm() {
    this.registrationForm = this.formBuilder.group({
      id: [this.register?.id ? this.register?.id : ''],
      name: [this.register?.name ? this.register?.name : '', Validators.required],
      cpf: [this.register?.cpf ? this.register?.cpf : '', [Validators.required, Validators.minLength(11)]],
      birthday: [this.register?.birthday ? new Date(this.register?.birthday) : '', Validators.required],
      street: [this.register?.street ? this.register?.street : '', Validators.required],
      number: [this.register?.number ? this.register?.number : '', Validators.required],
      complement: [this.register?.complement ? this.register?.complement : ''],
      district: [this.register?.district ? this.register?.district : '', Validators.required],
      postalCode: [this.register?.postalCode ? this.register?.postalCode : '', Validators.required],
      city: [this.register?.city ? this.register?.city : '', Validators.required],
      uf: [this.register?.uf ? this.register?.uf?.toUpperCase() : ''?.toUpperCase(), Validators.required],
      country: [this.COUNTRY],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    })
  }

  public findCEP() {
    const cep = this.registrationForm.get('postalCode')?.value
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
    this.registrationForm.patchValue({
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
  }

  public isPasswordSame() {
    const password = this.registrationForm.get('password')?.value;
    const passwordRepeat = this.registrationForm.get('passwordRepeat')?.value;
    return password === passwordRepeat
  }

  public clearSpecialCharactersCPF() {
    const cpf = this.registrationForm.get('cpf')?.value
    this.registrationForm.patchValue({
      cpf: cpf.replace(/[^0-9]/g, ''),
    })
  }

  public save() {
    this.validateForm();
    this.clearSpecialCharactersCPF();

    if (!this.registrationForm.valid) {
      return this.alertService.info('Prencha os campos obrigatórios')
    }

    if (!this.isPasswordSame()) {
      return this.alertService.error('As senhas precisam ser iguais!')
    }

    const id = this.registrationForm.get('id')?.value
    if (id) {
      this.update()
    } else {
      this.create()
    }
  }

  private update() {
    this.alertService.confirm('Deseja editar seus dados?', '', () => {
      this.registrationService.updateRegistration(this.registrationForm.value)
        .subscribe({
          next: () => {
            this.alertService.success('Dados editados com sucesso!')
            this.router.navigateByUrl('/')
            this.accommodationsService.findAccommodations();
          },
          error: () => {
            this.alertService.error('Erro ao editar os dados!')
          }
        })

    })
  }

  public create() {
    this.alertService.confirm('Deseja salvar seus dados?', '', () => {
      this.registrationService.createRegistration(this.registrationForm.value)
        .subscribe({
          next: () => {
            this.alertService.success('Dados salvo com sucesso!')
            this.router.navigateByUrl('/')
            this.accommodationsService.findAccommodations();
          },
          error: () => {
            this.alertService.error('Erro ao salvar os dados!')
          }
        })
    })
  }

  public toGoBack() {
    this.location.back();
  }
}

