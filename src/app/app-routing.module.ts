import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { DetailsComponent } from './components/detais/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterAccommodationComponent } from './components/register-accommodation/register-accommodation.component';
import { RegisteredAccommodationsComponent } from './components/registered-accommodations/registered-accommodations.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReservationComponent } from './components/reservation/reservation.component';

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
    path: 'reservation', component: ReservationComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'customers', component: CustomersComponent
  },
  {
    path: 'register-accomodation', component: RegisterAccommodationComponent
  },
  {
    path: 'register-accomodation/:id', component: RegisterAccommodationComponent
  },
  {
    path: 'registered-accomodations', component: RegisteredAccommodationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
