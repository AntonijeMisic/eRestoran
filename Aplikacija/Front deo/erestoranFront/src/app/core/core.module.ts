import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { SearchModule } from './search/search.module';
import { FooterModule } from './footer/footer.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarModule,
    SearchModule,
    FooterModule,
    HomeModule,
    SharedModule
  ]
})
export class CoreModule { }
