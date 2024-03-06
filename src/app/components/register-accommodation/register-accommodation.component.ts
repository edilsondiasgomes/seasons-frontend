import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { Accommodation, Address } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
import { AlertService } from './../../services/alert.service';
import { ConveniencesService } from './../../services/conveniences.service';


@Component({
  selector: 'app-register-accommodation',
  templateUrl: './register-accommodation.component.html',
  styleUrls: ['./register-accommodation.component.scss']
})

export class RegisterAccommodationComponent implements OnInit {

  accomodation!: Accommodation;
  editId!: string | null;
  preview = false;
  initialDate = new Date();
  finalDate = new Date();
  allConveniences: any[] = [];
  accomodationForm!: FormGroup;

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accomodation = {} as Accommodation;
    this.accomodation.address = {} as Address;
    this.accomodation.files = [];
    this.getConveniences();
    this.editAcomodation();
    this.createForm();
  }

  public createForm() {
    this.accomodationForm = this.formBuilder.group({
      id: [this.accomodation ? this.accomodation.id : ''],
      title: [this.accomodation ? this.accomodation.title : '', Validators.required],
      mainImage: [this.accomodation ? this.accomodation.mainImage : ''],
      address: this.formBuilder.group({
        street: [this.accomodation ? this.accomodation.address.street : ''],
        number: [this.accomodation ? this.accomodation.address.number : ''],
        complement: [this.accomodation ? this.accomodation.address.complement : ''],
        district: [this.accomodation ? this.accomodation.address.district : ''],
        postalCode: [this.accomodation ? this.accomodation.address.postalCode : ''],
        city: [this.accomodation ? this.accomodation.address.city : ''],
        uf: [this.accomodation ? this.accomodation.address.uf : ''],
        country: [this.accomodation ? this.accomodation.address.country : '']
      }),
      guestsAllowed: [this.accomodation ? this.accomodation.guestsAllowed : ''],
      checkIn: [this.accomodation ? this.accomodation.checkIn : ''],
      checkOut: [this.accomodation ? this.accomodation.checkOut : ''],
      petsAllowed: [this.accomodation ? this.accomodation.petsAllowed : false],
      parking: [this.accomodation ? this.accomodation.parking : false],
      rooms: [this.accomodation ? this.accomodation.rooms : ''],
      toilets: [this.accomodation ? this.accomodation.toilets : ''],
      description: [this.accomodation ? this.accomodation.description : ''],
      conveniencesPlace: this.formBuilder.array([]),
      files: this.formBuilder.array([]),
      initialDate: [new Date()],
      finalDate: [new Date()],
      guests: [this.accomodation ? this.accomodation.guests : ''],
      cleaningFee: [this.accomodation ? this.accomodation.cleaningFee : ''],
      totalCleaningFee: [this.accomodation ? this.accomodation.totalCleaningFee : ''],
      dailyRate: [this.accomodation ? this.accomodation.dailyRate : ''],
      totalDailyRate: [this.accomodation ? this.accomodation.totalDailyRate : ''],
      quantityDaily: [this.accomodation ? this.accomodation.quantityDaily : ''],
      amount: [this.accomodation ? this.accomodation.amount : ''],
    })
    this.setFilesIntoFormArray()
  }

  private getConveniences() {
    this.conveniencesService.getConveniences()
      .subscribe({
        next: (success) => {
          this.allConveniences = success
        },
        error: (error) => { }
      })
  }

  public findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  private editAcomodation() {
    if (this.activatedRoute) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.editId = params.get('id')
        if (this.editId) {
          this.accomodation = this.accommodationsService.accomodation;

          // this.accomodation.conveniences
          //   .forEach(item => { this.selectedconveniences.push(item) })

          // this.accomodation.files
          //   .forEach(file => { this.images.push(file) })
        }
      })
    }
  }

  public onSelectImage(event: any) {
    const file = event.files?.[0] as Blob;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.getFilesFormArray().push(this.formBuilder.control(e.target?.result as string))
      this.fileUpload.clear()
    }
    reader.readAsDataURL(file)
  }

  public deleteImage(file: any) {
    const i = this.getFilesFormArray().controls?.indexOf(file)
    this.getFilesFormArray().removeAt(i)

    // const i2 = this.accomodation.files?.indexOf(file)
    // this.accomodation.files.splice(i2, 1)
  }

  // private setImages() {
  //   this.images.forEach(file => {
  //     if (this.accomodation?.files?.length === 0) {
  //       this.accomodation.files = [];
  //       this.accomodation.files.push(file)
  //     } else {
  //       const isExistingFile = this.accomodation?.files?.some(existingFile => existingFile === file)
  //       if (!isExistingFile) {
  //         this.accomodation.files.push(file)
  //       }
  //     }
  //   }
  //   )
  // }

  // melhorar essa variavel constante
  private setPetsAllowed(): any {
    // this.accomodation.petsAllowed = this.selectedConvenience.some(item => item.name === 'Pets')
  }

  // public getConveniencesFormArray(): FormArray {
  //   return this.accomodationForm.get('conveniencesPlace') as FormArray
  // }

  private setConveniences() {
    const conveniencesPlaceArray = this.accomodationForm.get('conveniencesPlace') as FormArray
    conveniencesPlaceArray.clear();
    this.accomodation.conveniencesPlace.forEach(item => conveniencesPlaceArray.push(this.formBuilder.control(item)));
  }

  public getFilesFormArray(): FormArray {
    return this.accomodationForm.get('files') as FormArray
  }

  private setFilesIntoFormArray() {
    this.accomodation.files.forEach(item => this.getFilesFormArray().push(this.formBuilder.control(item)));
  }

  // public onPreview() {
  //   this.alertService.success('itemm salvo com sucesso!')
  // }

  public onSave() {

    // this.setImages();
    this.setConveniences();
    console.log(this.accomodationForm.value);

    // this.setPetsAllowed();
    // this.alertService.confirm('Deseja realmente salvar esse item?', 'Atenção!', () => {

    //   if (this.accomodation.id) {
    //     this.accommodationsService.putAccommodation(this.accomodation)
    //       .subscribe({
    //         next: () => {
    //           this.alertService.success('item alterado com sucesso!')
    //           this.router.navigateByUrl('/registered-accommodations')
    //         },
    //         error: (error) => { this.alertService.error(error) }
    //       })
    //   } else {
    //     this.accommodationsService.postAccommodation(this.accomodation)
    //       .subscribe({
    //         next: () => { this.alertService.success('item salvo com sucesso!') },
    //         error: (error) => { this.alertService.error(error) }
    //       })
    //   }
    // })

  }

  public toGoBack() {
    this.location.back();
  }
}
