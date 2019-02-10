import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmByIdRoutingModule } from './film-by-id-routing.module';
import { MaterialModule } from '../../../../material.module';
import { NotifierModule } from 'angular-notifier';

import { FilmByIdComponent } from './film-by-id.component';

@NgModule({
  declarations: [FilmByIdComponent],
  imports: [
    CommonModule,
    FilmByIdRoutingModule,
    MaterialModule,
    NotifierModule.withConfig( {
      position: {

        horizontal: {

          /**
           * Defines the horizontal position on the screen
           * type {'left' | 'middle' | 'right'}
           */
          position: 'right',

          /**
           * Defines the horizontal distance to the screen edge (in px)
           * type {number}
           */
          distance: 12

        },

        vertical: {

          /**
           * Defines the vertical position on the screen
           * type {'top' | 'bottom'}
           */
          position: 'top',

          /**
           * Defines the vertical distance to the screen edge (in px)
           * type {number}
           */
          distance: 12,

          /**
           * Defines the vertical gap, existing between multiple notifications (in px)
           * type {number}
           */
          gap: 10

        }

      }
    } )
  ]
})
export class FilmByIdModule { }
