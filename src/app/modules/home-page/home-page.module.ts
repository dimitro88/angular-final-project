import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomePageComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MaterialModule
  ]
})
export class HomePageModule { }
