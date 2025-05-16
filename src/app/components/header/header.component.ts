import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { UserService } from 'src/app/core/services/user.service';
import { SearchFilter } from 'src/app/shared/models/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  private readonly userMasterId = 52
  public isUserMaster = false;
  public inputSearch!: string;
  public minDate!: Date;
  public initialDate!: Date | null;
  public finalDate!: Date | null;
  public guests!: number | null; 
  public items!: MenuItem[];
  private searchFilter!: SearchFilter;
  private accommodationsService = inject(AccommodationsService)
  private userService = inject(UserService);
  private router = inject(Router)
  private user: any;

  ngOnInit() {
    this.setItems()
    this.minDate = new Date()
    this.userService.getUser().subscribe(
      (data) => { 
        if(data){
          this.user = data;
          this.checkUserMaster();
        }
      this.setItems() })
  }

  private checkUserMaster(){
    this.isUserMaster = this.user.userId === this.userMasterId
  }

  private setItems() {
    this.items = [{
      items: [
        // {
        //   label: 'Home',
        //   icon: 'fa-solid fa-home',
        //   routerLink: '/'
        // },
        {
          label: 'Entrar',
          icon: 'fa-solid fa-user',
          routerLink: '/login',
          visible: !this.userService.isUserLogged()
        },
        {
          label: 'Meus dados',
          icon: 'fa-solid fa-user',
          routerLink: '/registration',
          visible: this.userService.isUserLogged()
        },
        {
          label: 'Sair',
          icon: 'fa-solid fa-right-from-bracket',
          command: () => {
            this.userService.logout()
            this.goToHome();

          },
          visible: this.userService.isUserLogged()
        }
      ]
    },
    {
      label: 'Área administrativa',
      visible: this.userService.isUserLogged() && this.isUserMaster,
      items: [
        {
          label: 'Cadastrar acomodações',
          icon: 'fa-solid fa-plus',
          routerLink: '/accomodation-registration'
        },
        {
          label: 'Acomodações cadastradas',
          icon: 'fa-solid fa-house-chimney',
          routerLink: '/accommodations-list'
        },
        {
          label: 'Usuários',
          icon: 'fa-solid fa-users',
          routerLink: '/users-list'
        }
      ]
    }
    ];
  }

  private setFilterAccommodations() {
    this.searchFilter = {
      inputSearch: this.inputSearch,
      minDate: this.initialDate,
      maxDate: this.finalDate,
      guests: this.guests
    }
  }

  searchAccommodations() {
    this.setFilterAccommodations();
    this.router.navigateByUrl('/')
    this.accommodationsService.findAccommodations(this.searchFilter);
  }

  deleteSearching(){
    this.inputSearch = '';
    this.initialDate = null;
    this.finalDate = null;
    this.guests = null
    this.searchAccommodations();

  }

  goToHome() {
    this.router.navigateByUrl('/')
    this.accommodationsService.findAccommodations();
  }

}
