import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: './modules/main-page/main-page.module#MainPageModule'
  },
  {
    path: 'login',
    loadChildren: './modules/login-page/login-page.module#LoginPageModule'
  },
  {
    path: 'registration',
    loadChildren: './modules/registration-page/registration-page.module#RegistrationPageModule'
  },
  {
    path: 'home',
    loadChildren: './modules/home-page/home-page.module#HomePageModule',
  },
  {
    path: '**',
    loadChildren: './modules/not-found/not-found.module#NotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
