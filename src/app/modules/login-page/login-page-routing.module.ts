import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { LoginGuard } from '../../login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class LoginPageRoutingModule { }
