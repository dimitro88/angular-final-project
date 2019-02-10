import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavouriteFilmsComponent } from './favourite-films.component';

const routes: Routes = [
  {
    path: '',
    component: FavouriteFilmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavouriteFilmsRoutingModule { }
