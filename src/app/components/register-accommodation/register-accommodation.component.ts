import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-accommodation',
  templateUrl: './register-accommodation.component.html',
  styleUrls: ['./register-accommodation.component.scss']
})
export class RegisterAccommodationComponent {

  constructor(private location: Location) { }

  toGoBack() {
    this.location.back();
  }

}
