import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  informations: any;
  date!: Date;
  minDate = new Date();
  maxDate = new Date();
  hospedes = 1
  public items!: MenuItem[];

  ngOnInit() {
    this.date = new Date();
    this.minDate = new Date()
    this.items = [{
      label: 'Options',
      items: [{
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          // this.update();
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          // this.delete();
        }
      }
      ]
    },
    {
      label: 'Navigate',
      items: [{
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
      }
      ]
    }
    ];
  }



}
