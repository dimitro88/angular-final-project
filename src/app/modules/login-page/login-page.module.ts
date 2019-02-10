import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { MaterialModule } from '../../material.module';
import { NotifierModule } from 'angular-notifier';

import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
export class LoginPageModule { }
