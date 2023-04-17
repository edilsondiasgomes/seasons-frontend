import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    CardModule,
    AvatarModule

  ],
  exports: [
    ButtonModule,
    ToolbarModule,
    MenuModule,
    CardModule,
    AvatarModule

  ]
})
export class PrimengModule { }
