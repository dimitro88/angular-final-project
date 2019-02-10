import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { HomeGuard } from '../../home.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [HomeGuard],
    children: [
      { path: '', redirectTo: 'films', pathMatch: 'full' },
      { path: 'films', loadChildren: './modules/films/films.module#FilmsModule' },
      { path: 'films/:id', loadChildren: './modules/film-by-id/film-by-id.module#FilmByIdModule' },
      { path: 'favourite-films', loadChildren: './modules/favourite-films/favourite-films.module#FavouriteFilmsModule' },
      { path: 'map', loadChildren: './modules/map/map.module#MapModule' },
      { path: 'postcodes', loadChildren: './modules/postcodes/postcodes.module#PostcodesModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeGuard]
})
export class HomePageRoutingModule { }
