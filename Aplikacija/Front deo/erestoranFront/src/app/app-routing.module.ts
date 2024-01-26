import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/components/home/home.component';
import { RestoranComponent } from './feature/restaurants/components/restoran/restoran.component';
import { RestoranPageComponent } from './feature/restaurants/components/restoran-page/restoran-page.component';
import { RegisterComponent } from './feature/restaurants/components/register/register.component';
import { SignupComponent } from './feature/restaurants/components/signup/signup.component';
import { SalaComponent } from './feature/restaurants/components/sala/sala.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "restorani", component: RestoranComponent},
  {path:"signup", component:SignupComponent},
  {path: "register", component: RegisterComponent},
  {path: "sala/:id", component: SalaComponent},
  {path:"user", component: UserProfileComponent},
  {path: "restorani/:id", component: RestoranPageComponent},
  {path:"search/:searchTerm", component: RestoranComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
