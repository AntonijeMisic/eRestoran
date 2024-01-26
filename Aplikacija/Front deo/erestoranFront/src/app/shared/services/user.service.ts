import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Korisnik } from 'src/app/feature/restaurants/models/Korisnik';
import { BehaviorSubject, Observable } from 'rxjs';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  private userSubject: BehaviorSubject<Korisnik>=new BehaviorSubject<Korisnik>({} as Korisnik);
  public user$=this.userSubject.asObservable();
  

  constructor(private authService: AuthService, private http: HttpClient) { }

  getUserById(id: string)
  {
    return this.http.get<Korisnik>(`${url}/Korisnik/PrikaziKorisnika/${id}`);
  }

  postaviKorisnika(r: Korisnik)
  {
    this.userSubject.next(r);
  }

  updateKorisnik(id: string)
  {
    this.getUserById(id).subscribe((r: Korisnik)=>{
      this.userSubject.next(r);
    });
  }


  odjavi(): void {
    // Očisti sve podatke o korisniku iz lokalnog skladišta
    localStorage.clear();
  }

  checkLogIn(korisnik: Korisnik)
  {
    if(korisnik)
    return true;
    else
    return false;
  }

  checkUserAdmin(korisnik: Korisnik)
  {
    if(this.checkLogIn(korisnik))
    {
      if(korisnik.tip=="Admin")
        return true;
    }

    return false;
  }

  izmeniKorisnika(id: string, k: Korisnik)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Korisnik>(`${url}/Korisnik/IzmeniKorisnika/${id}`, JSON.stringify(
      {
        ime: k.ime,
        prezime: k.prezime,
        email: k.email,
        username: k.username,
        password: k.password,
        telefon: k.telefon
      }
    ), httpOptions);
  }

  
}
