import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AccommodationsService } from 'src/app/services/accomodations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private readonly MINIMUM_GUESTS = 1;
  public inputSearch!: string;
  public minDate!: Date;
  public maxDate!: Date;
  public guests!: number;
  public items!: MenuItem[];
  private accommodationsService = inject(AccommodationsService)

  ngOnInit() {
    this.guests = this.MINIMUM_GUESTS
    this.minDate = new Date()
    this.maxDate = new Date()
    this.setItems();
  }

  private setItems() {
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
        routerLink: '/registered-accommodations'
      },
      {
        label: 'Clientes',
        icon: 'fa-solid fa-users',
        routerLink: '/users-list'
      }
      ]
    }
    ];
  }

  buscarImoveis() {
    this.accommodationsService.searchFromHeader();
  }

}
