import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatGridListModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
  ],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
  ]
})
export class MaterialModule { }
