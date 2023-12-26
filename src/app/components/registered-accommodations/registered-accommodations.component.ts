import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registered-accommodations',
  templateUrl: './registered-accommodations.component.html',
  styleUrls: ['./registered-accommodations.component.scss']
})
export class RegisteredAccommodationsComponent {

  constructor(private location: Location) { }

  toGoBack() {
    this.location.back();
  }

}
