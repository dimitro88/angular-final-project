import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostcodesComponent } from './postcodes.component';

const routes: Routes = [
  {
    path: '',
    component: PostcodesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcodesRoutingModule { }
