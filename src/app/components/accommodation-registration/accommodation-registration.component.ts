import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { finalize, first } from 'rxjs';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { TypesService } from 'src/app/core/services/types.service';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { Accommodation, TypeAccomodation } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
import { AlertService } from '../../core/services/alert.service';
import { ConveniencesService } from '../../core/services/conveniences.service';

@Component({
  selector: 'app-accommodation-registration',
  templateUrl: './accommodation-registration.component.html',
  styleUrls: ['./accommodation-registration.component.scss']
})

export class AccommodationRegistrationComponent implements OnInit {

  accomodation!: Accommodation;
  currentMainImage!: string;
  editId!: string | null;
  preview = false;
  initialDate = new Date();
  finalDate = new Date();
  allConveniences: any[] = [];
  accomodationForm!: FormGroup;
  blockedPage!: boolean;
  typeAccomodation!: TypeAccomodation[];
  files: any = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private location: Location,
    private conveniencesService: ConveniencesService,
    private accommodationsService: AccommodationsService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private viaCepService: ViacepService,
    private typesService: TypesService
  ) { }

  ngOnInit(): void {
    this.accomodation = {} as Accommodation;
    this.accomodation.files = [];
    this.typeAccomodation = [];
    this.getConveniences();
    this.editAcomodation();
    this.getTypes();
    this.createForm();
  }

  public createForm() {
    this.accomodationForm = this.formBuilder.group({
      id: [this.accomodation ? this.accomodation.id : ''],
      typeSelected: [this.accomodation ? this.accomodation.typeSelected : '', [Validators.required]],
      title: ['Título da acomodoção'],
      street: [this.accomodation ? this.accomodation.street : ''],
      houseNumber: [76],
      complement: [this.accomodation ? this.accomodation.complement : ''],
      district: [this.accomodation ? this.accomodation.district : '', Validators.required],
      postalCode: [this.accomodation ? this.accomodation.postalCode : '', Validators.required],
      city: [this.accomodation ? this.accomodation.city : '', Validators.required],
      uf: [this.accomodation ? this.accomodation.uf?.toUpperCase() : ''?.toUpperCase(), Validators.required],
      country: ['Brasil'],
      guestsAllowed: [2],
      checkIn: ['16:00'],
      checkOut: ['18:00'],
      rooms: [2],
      toilets: [2],
      description: ['Experiência única em uma casa com arquitetura moderna e vista para as montanhas da Serra da Mantiqueira. Inserida em uma área privativa de 20mil m2 repleta de belezas naturais. É o lugar perfeito para se reconectar com quem mais importa.'],
      conveniencesPlace: this.formBuilder.array([], Validators.required),
      files: this.formBuilder.array([]),
      initialDate: [new Date()],
      finalDate: [new Date()],
      cleaningFee: [99.00],
      dailyRate: [200],
    })
    this.setFilesIntoFormArray()
    this.currentMainImage = this.setCurrenMainImage()
  }

  // public createForm() {
  //   this.accomodationForm = this.formBuilder.group({
  //     id: [this.accomodation ? this.accomodation.id : ''],
  //     typeSelected: [this.accomodation ? this.accomodation.typeSelected : '', [Validators.required]],
  //     title: [this.accomodation ? this.accomodation.title : '', [Validators.required, Validators.minLength(10)]],
  //     // mainImage: [this.accomodation ? this.accomodation.mainImage : ''],
  //     street: [this.accomodation ? this.accomodation.street : '', Validators.required],
  //     houseNumber: [this.accomodation ? this.accomodation.houseNumber : '', Validators.required],
  //     complement: [this.accomodation ? this.accomodation.complement : ''],
  //     district: [this.accomodation ? this.accomodation.district : '', Validators.required],
  //     postalCode: [this.accomodation ? this.accomodation.postalCode : '', Validators.required],
  //     city: [this.accomodation ? this.accomodation.city : '', Validators.required],
  //     uf: [this.accomodation ? this.accomodation.uf?.toUpperCase() : ''?.toUpperCase(), Validators.required],
  //     country: ['Brasil'],
  //     guestsAllowed: [this.accomodation ? this.accomodation.guestsAllowed : '', Validators.required],
  //     checkIn: [this.accomodation ? this.accomodation.checkIn : '', Validators.required],
  //     checkOut: [this.accomodation ? this.accomodation.checkOut : '', Validators.required],
  //     rooms: [this.accomodation ? this.accomodation.rooms : '', Validators.required],
  //     toilets: [this.accomodation ? this.accomodation.toilets : '', Validators.required],
  //     description: [this.accomodation ? this.accomodation.description : '', [Validators.required, Validators.minLength(200)]],
  //     conveniencesPlace: this.formBuilder.array([], Validators.required),
  //     files: this.formBuilder.array([]),
  //     initialDate: [new Date()],
  //     finalDate: [new Date()],
  //     cleaningFee: [this.accomodation ? this.accomodation.cleaningFee : '', Validators.required],
  //     dailyRate: [this.accomodation ? this.accomodation.dailyRate : '', Validators.required],
  //   })
  //   this.setFilesIntoFormArray()
  //   this.currentMainImage = this.setCurrenMainImage()
  // }

  private getConveniences() {
    this.conveniencesService.getConveniences()
      .subscribe({
        next: (success) => {
          this.allConveniences = success
        },
        error: (error) => { }
      })
  }

  private getTypes() {
    this.typesService.getTypes()
      .subscribe({
        next: (success) => {
          this.typeAccomodation = success;
        },
        error: () => { }
      })
  }

  public findCEP() {
    const cep = this.accomodationForm.get('postalCode')?.value
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
    this.accomodationForm.patchValue({
      street: endereco.logradouro,
      district: endereco.bairro,
      postalCode: endereco.cep,
      city: endereco.localidade,
      uf: endereco.uf?.toUpperCase(),
    });
  }

  public findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  private setCurrenMainImage() {
    return this.currentMainImage = this.getFilesFormArray().value[0]
  }

  private editAcomodation() {
    if (this.activatedRoute) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.editId = params.get('id')
        if (this.editId) {
          this.accomodation = this.accommodationsService.accomodation;
        }
      })
    }
  }

  public onSelectImage(event: any) {
    const file = event.files?.[0] as Blob;
 
    const reader = new FileReader();
    reader.onload = (e) => {
      this.getFilesFormArray().push(this.formBuilder.control(file))
      this.fileUpload.clear()
      this.files.push(e)
    }
    reader.readAsDataURL(file)
    console.log(this.files);
    
  }

  public deleteImage(file: any) {
    const iFormArray = this.getFilesFormArray().controls?.findIndex(control => control.value === file);
    this.getFilesFormArray().removeAt(iFormArray)

    const iFiles = this.files.indexOf(file)
    this.files.splice(iFiles, 1)
  }

  private setConveniences() {
    const conveniencesPlaceArray = this.accomodationForm.get('conveniencesPlace') as FormArray
    conveniencesPlaceArray.clear();
    if (this.accomodation.conveniencesPlace)
      this.accomodation.conveniencesPlace.forEach(item => conveniencesPlaceArray.push(this.formBuilder.control(item)));
  }

  public getFilesFormArray(): FormArray {
    return this.accomodationForm.get('files') as FormArray
  }

  // public setMainImageFirstPosition(newMainImage: any, i: number) {
  //   // if (newMainImage !== this.currentMainImage) {
  //   this.getFilesFormArray().removeAt(i)
  //   this.getFilesFormArray().insert(0, this.formBuilder.control(newMainImage))
  //   // }
  // }

  private setFilesIntoFormArray() {
    this.accomodation.files.forEach(item => {
      this.getFilesFormArray().push(this.formBuilder.control(item))
      this.files.push(item)
      
    });
  }

  private validateForm() {
    Object.keys(this.accomodationForm.controls).forEach(field => {
      const control = this.accomodationForm.get(field)
      control?.markAsDirty()
      control?.markAsTouched();
    })

    // const address = this.accomodationForm.get('address') as FormGroup
    // Object.keys(address.controls).forEach(field => {
    //   const control = address.get(field)
    //   control?.markAsDirty()
    //   control?.markAsTouched();
    // })
  }

  public isInvalidField(field: string): boolean {
    if (this.accomodationForm.get(field)?.touched && this.accomodationForm.get(field)?.invalid) {
      return true
    }
    return false
  }

  // public onPreview() {
  //   this.alertService.success('itemm salvo com sucesso!')
  // }

  // public onSave() {
  //   this.setConveniences();
  //   console.log(this.accomodationForm.value);
  // }

  public onSave() {
    this.setConveniences();
    this.validateForm();
    if (!this.accomodationForm.valid) {
      return this.alertService.error('Preencha os campos obrigatórios')
    }

    if (this.setCurrenMainImage() === 0) {
      return this.alertService.error('Selecione uma imagem principal')
    }

    this.alertService.confirm('Deseja realmente salvar esse item?', 'Atenção!', () => {
      this.blockedPage = true;
      if (this.accomodation.id) {
        this.accommodationsService.putAccommodation(this.accomodationForm.value)
          .pipe(first(),
            finalize(() => {
              this.blockedPage = false;
            }))
          .subscribe({
            next: () => {
              this.alertService.success('item alterado com sucesso!')
              this.router.navigateByUrl('/accommodations-list')
            },
            error: (error) => { this.alertService.error(error, 'Alteração deu erro!')
            }
          })
      } else {
        this.accommodationsService.postAccommodation(this.accomodationForm.value)
          .pipe(first(),
            finalize(() => {
              this.blockedPage = false;
            }))
          .subscribe({
            next: () => {
              this.alertService.success('item salvo com sucesso!')
              this.router.navigateByUrl('/accommodations-list')
            },
            error: (error) => { this.alertService.error(error) }
          })
      }
    })
  }

  public toGoBack() {
    this.location.back();
  }
}
