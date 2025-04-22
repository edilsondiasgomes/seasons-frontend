import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationRegistrationComponent } from './components/accommodation-registration/accommodation-registration.component';
import { AccommodationsListComponent } from './components/accommodations-list/accommodations-list.component';
import { DetailsComponent } from './components/detais/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'details', component: DetailsComponent
  },
  {
    path: 'reservation', component: ReservationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'registration', component: UserRegistrationComponent,
  },
  {
    path: 'users-list', component: UsersListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users-list/:id', component: UserRegistrationComponent
  },
  {
    path: 'accomodation-registration', component: AccommodationRegistrationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'accomodation-registration/:id', component: AccommodationRegistrationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'accommodations-list', component: AccommodationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
