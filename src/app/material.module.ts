import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatIconModule,
} from '@angular/material';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatAutocompleteModule,
    MatListModule
  ]
})

export class MaterialModule {}
