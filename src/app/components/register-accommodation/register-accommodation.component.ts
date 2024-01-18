import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { AccommodationsService } from 'src/app/services/accomodations.service';
import { Accommodation, Address, Conveniences } from 'src/app/shared/models/model';
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
  conveniences: Conveniences[] = []
  selectedConvenience: Conveniences[] = [];
  uploadedFiles: any[] = [];
  base64Images: any[] = [];

  base64Result!: string;
  imgSrc!: any;


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
    private sanitizer: DomSanitizer,
    private accommodationsService: AccommodationsService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.accomodation = {} as Accommodation;
    this.accomodation.address = {} as Address;
    this.getConveniences();
    this.editAcomodation();
  }

  private getConveniences() {
    this.conveniencesService.getConveniences()
      .subscribe({
        next: (success) => {
          this.accomodation.conveniences = [];
          this.conveniences = success
        },
        error: () => { }
      })
  }

  private editAcomodation() {
    if (this.activatedRoute) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.editId = params.get('id')
        if (this.editId) {
          this.accomodation = this.accommodationsService.accomodation;
          this.selectedConvenience = this.accommodationsService.accomodation.conveniences
          this.accomodation.files.forEach(file =>
            this.convertBase64ToFile(file)
          )
        }
        console.log('uploadedFiles:', this.uploadedFiles);

      })
    }
  }

  public convertBase64ToFile(base64: string): void {
    const blob = this.base64ToBlob(base64);
    const file = new File([blob], 'nome_do_arquivo.jpg', { type: 'image/jpeg' });
    this.imgSrc = URL.createObjectURL(file)
    this.uploadedFiles.push(this.imgSrc);
  }

  private base64ToBlob(base64: string): Blob {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);

    for (let i = 0; i < length; i++) {
      view[i] = binaryString.charCodeAt(i);
    }

    return new Blob([buffer], { type: 'image/jpeg' });
  }

  convertBlobToBase64(blob: Blob): void {
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result as string;
      const base64 = dataURL.split(',')[1];
      this.base64Images.push(base64);
    };

    reader.readAsDataURL(blob);
  }

  public toGoBack() {
    this.location.back();
  }

  public findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  public onSelect(event: any) {
    console.log('onSelect', this.fileUpload._files);
    const blob = this.fileUpload._files[0];
    this.convertBlobToBase64(blob)
    console.log('uploadedFiles:', this.uploadedFiles);
  }

  public onPreview() {
    // this.alertService.success('itemm salvo com sucesso!')
  }

  // melhorar essa variavel constate
  private setPetsAllowed(): any {
    this.accomodation.petsAllowed = this.selectedConvenience.some(item => item.name === 'Pets')
  }

  private setConveniences() {
    this.accomodation.conveniences = [];
    this.selectedConvenience.forEach(item => this.accomodation.conveniences.push(item));
  }

  private setFiles() {
    if (!this.accomodation.id) {
      this.accomodation.files = [];
    }
    this.fileUpload._files.forEach(file => this.convertBlobToBase64(file))
    this.base64Images.forEach(file => this.accomodation.files.push(file))
  }

  public onSave() {
    this.setConveniences();
    this.setPetsAllowed();
    this.setFiles();
    this.alertService.confirm('Deseja realmente salvar esse item?', 'Atenção!', () => {

      if (this.accomodation.id) {
        this.accommodationsService.putAccommodation(this.accomodation)
          .subscribe({
            next: () => {
              this.alertService.success('item alterado com sucesso!')
              this.router.navigateByUrl('/registered-accommodations')
            },
            error: (error) => { this.alertService.error(error) }
          })
      } else {
        this.accommodationsService.postAccommodation(this.accomodation)
          .subscribe({
            next: () => { this.alertService.success('item salvo com sucesso!') },
            error: (error) => { this.alertService.error(error) }
          })
      }
    })

  }
}
