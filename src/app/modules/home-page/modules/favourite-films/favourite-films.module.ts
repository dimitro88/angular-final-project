import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';

import { FavouriteFilmsRoutingModule } from './favourite-films-routing.module';
import { FavouriteFilmsComponent } from './favourite-films.component';

@NgModule({
  declarations: [FavouriteFilmsComponent],
  imports: [
    CommonModule,
    FavouriteFilmsRoutingModule,
    MaterialModule
  ]
})
export class FavouriteFilmsModule { }
