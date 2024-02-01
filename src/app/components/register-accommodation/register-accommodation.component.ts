import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  conveniences!: FormArray;
  selectedConvenience!: FormArray
  images: any[] = [];
  base64Files: any[] = [];
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
    this.createForm();
    this.getConveniences();
    this.editAcomodation();
  }

  public createForm() {

    this.conveniences = this.formBuilder.array([])

    this.selectedConvenience = this.formBuilder.array([])

    this.accomodationForm = this.formBuilder.group({
      id: [''],
      title: [''],
      mainImage: [''],
      address: this.formBuilder.group({
        street: [''],
        number: [''],
        complement: [''],
        district: [''],
        postalCode: [''],
        city: [''],
        uf: [''],
        country: ['']
      }),
      guestsAllowed: [''],
      checkIn: [''],
      checkOut: [''],
      petsAllowed: [false],
      parking: [false],
      rooms: [''],
      toilets: [''],
      description: [''],
      conveniencesPlace: this.conveniences,
      files: this.formBuilder.array([]),
      initialDate: [new Date()],
      finalDate: [new Date()],
      guests: [''],
      cleaningFee: [''],
      totalCleaningFee: [''],
      dailyRate: [''],
      totalDailyRate: [''],
      quantityDaily: [''],
      amount: [''],

    })

  }

  private getConveniences() {
    this.conveniencesService.getConveniences()
      .subscribe({
        next: (success) => {
          this.accomodation.conveniencesPlace = [];
          this.conveniences
          console.log(this.conveniences.value);

          // this.conveniences = success
        },
        error: () => { }
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
          // this.selectedConvenience = this.accommodationsService.accomodation.conveniences
          this.accomodation.files.forEach(file => {
            this.images.push(file)
          }
          )
        }
      })
    }
  }

  public onSelectImage(event: any) {
    const file = event.files?.[0] as Blob;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.images.push(e.target?.result as string)
      this.fileUpload.clear()
    }
    reader.readAsDataURL(file)
  }

  public deleteImage(file: any) {

    const i = this.images?.indexOf(file)
    this.images.splice(i, 1)

    const i2 = this.accomodation.files?.indexOf(file)
    this.accomodation.files.splice(i2, 1)
  }

  private setImages() {

    this.images.forEach(file => {
      if (this.accomodation?.files?.length === 0) {
        this.accomodation.files = [];
        this.accomodation.files.push(file)
      } else {
        const isExistingFile = this.accomodation?.files?.some(existingFile => existingFile === file)
        if (!isExistingFile) {
          this.accomodation.files.push(file)
        }
      }
    }
    )
  }

  // melhorar essa variavel constante
  private setPetsAllowed(): any {
    // this.accomodation.petsAllowed = this.selectedConvenience.some(item => item.name === 'Pets')
  }

  private setConveniences() {
    this.accomodation.conveniencesPlace = [];
    // this.selectedConvenience.forEach(item => this.accomodation.conveniences.push(item));
  }

  // public onPreview() {
  //   this.alertService.success('itemm salvo com sucesso!')
  // }

  public onSave() {
    console.log(this.accomodationForm);

    // this.setImages();
    // this.setConveniences();
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
