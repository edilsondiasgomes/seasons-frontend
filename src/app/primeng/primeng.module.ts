import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextareaModule,
    DropdownModule,
    GalleriaModule,
    CalendarModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    TooltipModule,
    InputNumberModule,
    TableModule


  ],
  exports: [
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    GalleriaModule,
    CalendarModule,
    ToolbarModule,
    MenuModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    TableModule,
    TooltipModule,
    InputNumberModule

  ]
})
export class PrimengModule { }
