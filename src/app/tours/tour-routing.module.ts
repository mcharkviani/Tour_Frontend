import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ToursComponent} from './tours.component';
import {TourDetailComponent} from './tour-detail/tour-detail.component';
import {TourAddComponent} from './tour-add/tour-add.component';
import {TourEditComponent} from './tour-edit/tour-edit.component';

const routes: Routes = [
  {path: '', component: ToursComponent},
  {path: 'add', component: TourAddComponent},
  {path: 'detail/:id', component: TourDetailComponent},
  {path: 'edit/:id', component: TourEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRoutingModule { }
export const tourRoutingComponents = [
  ToursComponent,
  TourDetailComponent,
  TourAddComponent,
  TourEditComponent
];

