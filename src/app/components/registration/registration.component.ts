import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  initialDate = new Date();
  finalDate = new Date();

  constructor(private location: Location) { }

  toGoBack() {
    this.location.back();
  }

}
