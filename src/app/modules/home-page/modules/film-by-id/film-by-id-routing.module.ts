import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmByIdComponent } from './film-by-id.component';

const routes: Routes = [
  {
    path: '',
    component: FilmByIdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmByIdRoutingModule { }
