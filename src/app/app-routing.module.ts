import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// Lazy Loading on tours path
const routes: Routes = [
  {path: '', redirectTo: '/tours', pathMatch: 'full'},
  {path: 'tours', loadChildren: './tours/tour.module#TourModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  PageNotFoundComponent
];

