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
      // label: 'Options',
      items: [
        {
          label: 'Home',
          icon: 'fa-solid fa-home',
          routerLink: '/'
        },
        {
          label: 'Entrar',
          icon: 'fa-solid fa-user',
          routerLink: '/login'
        },
        {
          label: 'Meus dados',
          icon: 'fa-solid fa-user',
          routerLink: '/registration'
        },
        {
          label: 'Sair',
          icon: 'fa-solid fa-right-from-bracket',
          routerLink: '/'
        }
      ]
    },
    {
      label: 'Área administrativa',
      items: [{
        label: 'Cadastrar acomodações',
        icon: 'fa-solid fa-plus',
        routerLink: '/register-accomodation'
      },
      {
        label: 'Acomodações cadastradas',
        icon: 'fa-solid fa-house-chimney',
        routerLink: '/registered-accomodations'
      },
      {
        label: 'Clientes',
        icon: 'fa-solid fa-users',
        routerLink: '/customers'
      }
      ]
    }
    ];
  }



}
