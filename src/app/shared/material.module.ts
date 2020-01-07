import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {DialogContentExampleDialogComponent} from '../tours/dialog-content-example-dialog/dialog-content-example-dialog.component';

const materials = [
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [
    materials
  ],
  exports: [
    materials
  ],
  entryComponents: [
    DialogContentExampleDialogComponent
  ]

})
export class MaterialModule { }
