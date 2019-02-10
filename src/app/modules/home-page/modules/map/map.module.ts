import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MapModule { }
