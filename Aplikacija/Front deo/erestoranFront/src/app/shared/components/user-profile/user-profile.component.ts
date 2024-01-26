import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Korisnik } from 'src/app/feature/restaurants/models/Korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public currentUser!:Korisnik;
  public editMode: boolean=false;

  constructor(private auth: AuthService, private userService: UserService, private router: Router){}
  ngOnInit(): void {
    let id: string | null = this.auth.getUserIdFromStorage();

    if(id !== null)
      {
        this.userService.getUserById(id).subscribe(
          (res)=>{
            this.userService.postaviKorisnika(res);
            this.userService.user$.subscribe((res)=>{
              this.currentUser=res;
              
              
            });

            this.userService.updateKorisnik(id!);
                
          }
        );
      }
  }

  changeMode()
  {
    this.editMode=true;
  }
  closeEditMode()
  {
    this.editMode=false;
  }
  sacuvajIzmene()
  {
    const imeInput: HTMLTextAreaElement = document.querySelector("#ime")! as HTMLTextAreaElement;
    const prezimeInput: HTMLInputElement = document.querySelector("#prezime")! as HTMLInputElement;
    const userInput: HTMLInputElement = document.querySelector("#username")! as HTMLInputElement;
    const emailInput: HTMLInputElement = document.querySelector("#email")! as HTMLInputElement;
    const telefonInput: HTMLInputElement = document.querySelector("#telefon")! as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.querySelector("#newPassword")! as HTMLInputElement;

    if(this.currentUser)
    {
      if(
        imeInput.value!==null && imeInput.value!="" && prezimeInput.value!==null && prezimeInput.value!=""
        && userInput.value!==null && userInput.value!="" && emailInput.value!==null && emailInput.value!=""
        && telefonInput.value!==null && telefonInput.value!=""
      )
      {
        if(passwordInput.value==null || passwordInput.value=="")
        {
          //to znaci da ne menjamo sifru koju smo vec imali
          let k: Korisnik={
            id:this.currentUser.id,
            tip: this.currentUser.tip,
            ime: imeInput.value,
            prezime: prezimeInput.value,
            email: emailInput.value,
            telefon: telefonInput.value,
            username: userInput.value,
            password: this.currentUser.password
          }

          this.userService.izmeniKorisnika(this.currentUser.id.toString(), k).subscribe((res)=>{
            console.log(res);
            this.editMode=false;
            this.userService.updateKorisnik(this.currentUser.id.toString());
          });
        }
        else
        {
          //menjamo i sifru
          let k: Korisnik={
            id:this.currentUser.id,
            tip: this.currentUser.tip,
            ime: imeInput.value,
            prezime: prezimeInput.value,
            email: emailInput.value,
            telefon: telefonInput.value,
            username: userInput.value,
            password: passwordInput.value
          }

          this.userService.izmeniKorisnika(this.currentUser.id.toString(), k).subscribe((res)=>{
            console.log(res);
            this.userService.updateKorisnik(this.currentUser.id.toString());
            this.editMode=false;
          });
        }
      }
      else
      {
        alert("Neki od podataka nisu dobro uneti");
      }
    }
  }
}
