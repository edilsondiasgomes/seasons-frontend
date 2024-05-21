import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccommodationRegistrationComponent } from './components/accommodation-registration/accommodation-registration.component';
import { AccommodationsListComponent } from './components/accommodations-list/accommodations-list.component';
import { DetailsComponent } from './components/detais/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PrimengModule } from './primeng/primeng.module';

registerLocaleData(localeBr, 'pt')


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    FooterComponent,
    ReservationComponent,
    UserRegistrationComponent,
    UsersListComponent,
    AccommodationRegistrationComponent,
    AccommodationsListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
