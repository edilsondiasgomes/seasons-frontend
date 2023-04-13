import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    MenuModule
  ],
  exports: [
    ButtonModule,
    ToolbarModule,
    MenuModule

  ]
})
export class PrimengModule { }
