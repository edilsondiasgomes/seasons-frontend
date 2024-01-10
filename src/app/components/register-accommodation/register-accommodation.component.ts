import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { AccomodationsService } from 'src/app/services/accomodations.service';
import { Accomodation, Address, Conveniences } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';
import { AlertService } from './../../services/alert.service';
import { ConveniencesService } from './../../services/conveniences.service';

@Component({
  selector: 'app-register-accommodation',
  templateUrl: './register-accommodation.component.html',
  styleUrls: ['./register-accommodation.component.scss']
})

export class RegisterAccommodationComponent implements OnInit {

  accomodation!: Accomodation;
  conveniences: Conveniences[] = []
  editId!: string | null;
  preview = false;
  initialDate = new Date();
  finalDate = new Date();
  selectedConvenience: Conveniences[] = [];
  uploadedFiles: any[] = [];
  uploadedFilesImage: any[] = [];
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
    private accomodationsService: AccomodationsService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.accomodation = {} as Accomodation;
    this.accomodation.address = {} as Address;
    this.accomodation.conveniences = [];
    this.conveniences = this.conveniencesService.conveniences
    this.editAcomodation()
  }

  editAcomodation() {
    if (this.activatedRoute) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.editId = params.get('id')
        if (this.editId) {
          this.accomodation = this.accomodationsService.accomodation;
          this.selectedConvenience = this.accomodationsService.accomodation.conveniences
        }
      })
    }
  }

  toGoBack() {
    this.location.back();
  }

  findIcon(convenience: string) {
    return ConvenienceUtils.findIcon(convenience)
  }

  onSelect(event: any) {
    console.log(this.fileUpload._files);
    const file2 = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileUpload._files[0]))
    // (<any>file2).objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileUpload._files[0]))
    this.uploadedFilesImage.push((<any>file2).changingThisBreaksApplicationSecurity)
    console.log(this.uploadedFilesImage);
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log('caiu aqui');
    }
  }

  onPreview() {
    this.alertService.save('itemm salvo com sucesso!')
  }

  onSave() {
    this.selectedConvenience.forEach(item => this.accomodation.conveniences.push(item));
    console.log('Comodidades do cadastro', this.accomodation.conveniences);

    this.alertService.confirm('Deseja realmente salver esse item?', 'Atenção!', 'Item salvo com sucesso!', () => {
      console.log('entrou no confirmed');
    })



    this.accomodationsService.accomodations.push(this.accomodation)

  }
}
