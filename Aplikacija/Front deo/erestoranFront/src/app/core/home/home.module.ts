import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SearchModule } from '../search/search.module';
import { FooterModule } from '../footer/footer.module';
import { RestaurantsModule } from 'src/app/feature/restaurants/restaurants.module';
import { NavbarModule } from "../navbar/navbar.module";



@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        SearchModule,
        FooterModule,
        RestaurantsModule,
        NavbarModule
    ]
})
export class HomeModule { }
