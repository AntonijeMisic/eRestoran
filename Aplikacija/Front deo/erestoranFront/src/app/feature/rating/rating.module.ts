import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import { RatingComponent } from './components/rating/rating.component'
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { AddRatingComponent } from './components/rating/add-rating/add-rating.component';



@NgModule({
  declarations: [
    RatingComponent,
    AddRatingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    RatingComponent,
    AddRatingComponent
  ]
})
export class RatingModule { }
