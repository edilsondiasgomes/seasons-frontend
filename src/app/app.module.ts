import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/detais/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { PrimengModule } from './primeng/primeng.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RegisterAccommodationComponent } from './components/register-accommodation/register-accommodation.component';
import { RegisteredAccommodationsComponent } from './components/registered-accommodations/registered-accommodations.component';
import { LoginComponent } from './components/login/login.component';

registerLocaleData(localeBr, 'pt')


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    FooterComponent,
    ReservationComponent,
    RegistrationComponent,
    CustomersComponent,
    RegisterAccommodationComponent,
    RegisteredAccommodationsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
