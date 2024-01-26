import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SharedModule } from '../shared/shared.module';
import { RatingModule } from './rating/rating.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RestaurantsModule,
    SharedModule,
    RatingModule
  ]
})
export class FeatureModule { }
