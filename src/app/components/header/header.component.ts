import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AccommodationsService } from 'src/app/core/services/accomodations.service';
import { UserService } from 'src/app/core/services/user.service';
import { SearchFilter } from 'src/app/shared/models/model';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  private readonly userMasterId = 61
  public inputSearch!: string;
  public minDate!: Date;

  public rangeDates!: Date[];

  public initialDate!: Date | null;
  public finalDate!: Date | null;

  public guests!: number | null;
  public items!: MenuItem[];
  private searchFilter!: SearchFilter;
  private accommodationsService = inject(AccommodationsService)
  private userService = inject(UserService);
  private router = inject(Router)
  public user: any;
  visible = false

  constructor(public dialogService: DialogService) { }

  ngOnInit() {
    this.setItems()
    this.minDate = new Date()
    this.userService.getUser().subscribe(
      (data) => {
        if (data) {
          this.user = data;
          this.checkUserMaster();
        }
        this.setItems()
      })

  }

  private checkUserMaster() {
    this.userService.isUserMaster = this.user.userId === this.userMasterId
  }

  showDialog(){
    this.visible = true;
  }

  closeDialog(){
    this.visible = false
  }

  showDialogLogin() {
    this.dialogService.open(LoginComponent, { header: '' });
  }

  private setItems() {
    this.items = [
      {
        label: this.user ? ('Olá, ' + this.user?.userName + '!') : 'Olá!',
        items: [
          {
            label: 'Entrar',
            icon: 'fa-solid fa-user',
            // routerLink: '/login',
            command: () => {
              this.showDialogLogin();
            },
            visible: !this.userService.isUserLogged()
          },
          // {
          //   label: 'QRCode',
          //   icon: 'fa-solid fa-users',
          //   routerLink: '/qrcode',
          //   visible: !this.userService.isUserLogged()
          // },
          {
            label: 'Meus dados',
            icon: 'fa-solid fa-user',
            routerLink: '/registration',
            visible: this.userService.isUserLogged() && !this.userService.isUserMaster
          },
          {
            label: 'Minhas reservas',
            icon: 'fa-solid fa-building',
            routerLink: '/reservations',
            visible: this.userService.isUserLogged() && !this.userService.isUserMaster
          },
          {
            label: 'Sair',
            icon: 'fa-solid fa-right-from-bracket',
            command: () => {
              this.user = '';
              this.userService.logout()
              this.goToHome();
            },
            visible: this.userService.isUserLogged() && !this.userService.isUserMaster
          }
        ]
      },
      {
        label: 'Área administrativa',
        visible: this.userService.isUserLogged() && this.userService.isUserMaster,
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
          },
          {
            label: 'Reservas',
            icon: 'fa-solid fa-building',
            routerLink: '/reservations'
          },
          {
            label: 'Sair',
            icon: 'fa-solid fa-right-from-bracket',
            command: () => {
              this.user = '';
              this.userService.logout()
              this.goToHome();
            },
            visible: this.userService.isUserLogged()
          }

        ]
      }
    ];
  }

  private setFilterAccommodations() {
    this.searchFilter = {
      inputSearch: this.inputSearch,
      minDate: this.initialDate ?? this.rangeDates[0],
      maxDate: this.finalDate?? this.rangeDates[1],
      guests: this.guests
    }
  }

  searchAccommodations() {
    this.setFilterAccommodations();
    this.router.navigateByUrl('/')
    this.accommodationsService.findAccommodations(this.searchFilter);
    this.inputSearch = '';
  }

  deleteSearching() {
    this.inputSearch = '';
    this.rangeDates = [];
    this.guests = null
    this.searchAccommodations();

  }

  goToHome() {
    this.router.navigateByUrl('/')
    this.accommodationsService.findAccommodations();
  }

}
