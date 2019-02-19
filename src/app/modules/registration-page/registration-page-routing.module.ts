import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './registration-page.component';
import { LoginGuard } from '../../login.guard';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class RegistrationPageRoutingModule { }
