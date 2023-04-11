import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule
  ],
  exports: [
    ButtonModule,
    ToolbarModule
  ]
})
export class PrimengModule { }
