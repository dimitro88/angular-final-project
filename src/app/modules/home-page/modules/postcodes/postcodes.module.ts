import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../material.module';

import { PostcodesRoutingModule } from './postcodes-routing.module';
import { PostcodesComponent } from './postcodes.component';

@NgModule({
  declarations: [PostcodesComponent],
  imports: [
    CommonModule,
    PostcodesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostcodesModule { }
