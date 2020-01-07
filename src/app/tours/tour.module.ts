import { NgModule } from '@angular/core';
import { tourRoutingComponents, TourRoutingModule} from './tour-routing.module';
import {SharedModule} from '../shared/shared.module';
import {DialogContentExampleDialogComponent} from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import {RatingModule} from 'ng-starrating';

@NgModule({
  declarations: [
    tourRoutingComponents,
    DialogContentExampleDialogComponent,
  ],
  imports: [
    TourRoutingModule,
    SharedModule,
    RatingModule
  ],
  exports: [
  ]
})
export class TourModule { }
