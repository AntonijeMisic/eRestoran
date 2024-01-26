import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { NavbarModule } from './core/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './core/home/home.module';
import { FooterModule } from './core/footer/footer.module';
import { NgToastModule } from 'ng-angular-popup';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './feature/restaurants/interceptors/token.interceptor';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeatureModule,
    BrowserAnimationsModule,
    NavbarModule,
    HomeModule,
    FooterModule,
    NgToastModule,
    SharedModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, {provide: DateAdapter, useClass: CustomDateAdapter }, MatDialogModule, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
