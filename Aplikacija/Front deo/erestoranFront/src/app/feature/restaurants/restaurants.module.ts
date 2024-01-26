import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestedComponent } from './components/suggested/suggested.component';
import { HttpClientModule } from '@angular/common/http';
import { RestoranComponent } from './components/restoran/restoran.component';
import { RestoranPageComponent } from './components/restoran-page/restoran-page.component';
import { RouterModule } from '@angular/router';
import { MeniComponent } from './components/meni/meni.component';
import { KomentariComponent } from './components/komentari/komentari.component';
import { PreporucenaJelaComponent } from './components/preporucena-jela/preporucena-jela.component';
import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup'
import { NavbarModule } from "../../core/navbar/navbar.module";
import {MatButtonModule} from "@angular/material/button"
import { HranaInfoComponent } from './components/hrana-info/hrana-info.component';
import { HranaKomentariComponent } from './components/hrana-komentari/hrana-komentari.component';
import { AddHranaKomComponent } from './components/add-hrana-kom/add-hrana-kom.component';
import { RatingModule } from '../rating/rating.module';
import { SalaComponent } from './components/sala/sala.component';
import {MatDatepickerModule} from "@angular/material/datepicker"
import { MatNativeDateModule } from '@angular/material/core';
import { PotvrdaDialogComponent } from './components/potvrda-dialog/potvrda-dialog.component';
import { RezervacijaDialogComponent } from './components/rezervacija-dialog/rezervacija-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { KomentarEditComponent } from './components/komentar-edit/komentar-edit.component';
import {MatIconModule} from '@angular/material/icon'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DodajObjekatDialogComponent } from './components/dodaj-objekat-dialog/dodaj-objekat-dialog.component';
import { EditObjDialogComponent } from './components/edit-obj-dialog/edit-obj-dialog.component';
import { EditJeloDialogComponent } from './components/edit-jelo-dialog/edit-jelo-dialog.component';
import { EditRestoranDijalogComponent } from './components/edit-restoran-dijalog/edit-restoran-dijalog.component';
import { FooterModule } from 'src/app/core/footer/footer.module';
import { DodajSaluDialogComponent } from './components/dodaj-salu-dialog/dodaj-salu-dialog.component';



@NgModule({
    declarations: [
        SuggestedComponent, 
        RestoranComponent, 
        RestoranPageComponent, 
        MeniComponent, 
        KomentariComponent, 
        PreporucenaJelaComponent, 
        RegisterComponent,
        SignupComponent, 
        HranaInfoComponent, 
        HranaKomentariComponent, 
        AddHranaKomComponent, 
        SalaComponent, 
        PotvrdaDialogComponent,
        RezervacijaDialogComponent,
        KomentarEditComponent,
        DodajObjekatDialogComponent,
        EditObjDialogComponent,
        EditJeloDialogComponent,
        EditRestoranDijalogComponent,
        DodajSaluDialogComponent
    ],
    exports: [SuggestedComponent, RestoranComponent, RestoranPageComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgToastModule,
        NavbarModule,
        MatButtonModule,
        RatingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatIconModule,
        DragDropModule,
        FooterModule
    ]
})
export class RestaurantsModule { }
