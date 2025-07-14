import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Accommodation } from 'src/app/shared/models/model';
import { ConvenienceUtils } from 'src/app/shared/utils/icon-convenience-utils';

@Component({
  selector: 'app-detais-dialog',
  templateUrl: './detais-dialog.component.html',
  styleUrls: ['./detais-dialog.component.scss']
})

export class DetaisDialogComponent implements OnInit {

  accomodation!: Accommodation;
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
  ]

  constructor(private dynamicDialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.accomodation = this.dynamicDialogConfig.data
    console.log(this.accomodation);

  }

   
    findIcon(convenience: string) {
      return ConvenienceUtils.findIcon(convenience)
    }


}
