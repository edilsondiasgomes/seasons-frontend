import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  constructor(private location: Location) { }

  toGoBack() {
    this.location.back();
  }


}
