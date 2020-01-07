import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxPaginationModule
  ],
})
export class SharedModule { }
