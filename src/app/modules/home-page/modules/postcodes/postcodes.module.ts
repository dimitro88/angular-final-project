import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostcodesRoutingModule } from './postcodes-routing.module';
import { PostcodesComponent } from './postcodes.component';

@NgModule({
  declarations: [PostcodesComponent],
  imports: [
    CommonModule,
    PostcodesRoutingModule
  ]
})
export class PostcodesModule { }
