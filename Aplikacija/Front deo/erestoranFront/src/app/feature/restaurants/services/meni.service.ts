import { Injectable } from '@angular/core';
import { Jela } from '../models/Jela';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class MeniService {

  private meniSubject: BehaviorSubject<Jela[]>=new BehaviorSubject<Jela[]>([]);
  public meniRes$=this.meniSubject.asObservable();
  private jeloSubject: BehaviorSubject<Jela>=new BehaviorSubject<Jela>({} as Jela);
  public jeloRes$=this.jeloSubject.asObservable();
  private preporucenaJelaSubject: BehaviorSubject<Jela[]>=new BehaviorSubject<Jela[]>([]);
  public preporucenaJela$=this.preporucenaJelaSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  getMeniRestorana(id:string): Observable<Jela[]>
  {
    return this.http.get<Jela[]>(`${url}/Hrana/PrikaziMeni/${id}`);
  }
  
  updateMeni(id:string)
  {
    this.getMeniRestorana(id).subscribe((j: Jela[])=>{
      this.meniSubject.next(j);
    },
    () => {
      this.meniSubject.next([]); // Resetuj meni na prazan niz u slučaju greške
    }
    );
  }

  getHranaFromRestoran(id:string)
  {
    return this.http.get<Jela>(`${url}/Hrana/PrikaziHranu/${id}`);
  }
  postaviHranu(j: Jela)
  {
    if(j)
      this.jeloSubject.next(j);
  }
  updateJelo(id:string)
  {
    this.getHranaFromRestoran(id).subscribe((j: Jela)=>{
      this.jeloSubject.next(j);
    },
    () => {
      this.jeloSubject.next({} as Jela); // Resetuj jelo na prazan obj u slučaju greške
    }
    );
  }
  getAvgOcenaJela(id: string)
  {
    return this.http.get<number>(`${url}/Ocena/ProsecnaOcenaHrane/${id}`);
  }
  getPreporucenaJela(id:string)
  {
    return this.http.get<Jela[]>(`${url}/Hrana/PreporucenaHrana/${id}`);
  }

  updatePreporucena(id:string)
  {
    this.getPreporucenaJela(id).subscribe((j: Jela[])=>{
      this.preporucenaJelaSubject.next(j);
    },
    () => {
      this.preporucenaJelaSubject.next([]); // Resetuj meni na prazan niz u slučaju greške
    }
    );
  }
 

  dodajJelouMeni(idRes:string,korisnikId: string, j:Jela): Observable<Jela>
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Jela>(`${url}/Hrana/UnesiHranu/${idRes}?korisnikID=${korisnikId}`, JSON.stringify(
      {
      naziv: j.naziv,
      opis: j.opis,
      cena: j.cena,
      slika: j.slika,
      kolicina: j.kolicina,
      jedinicaMere: j.jedinicaMere
      }
    ), httpOptions);
  }

  izmeniJelo(j: Jela, korisnikId: string)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    let idJela: string = j.id.toString();
    return this.http.put<Jela>(`${url}/Hrana/IzmeniHranu/${idJela}?korisnikID=${korisnikId}`, JSON.stringify(
      {
      naziv: j.naziv,
      opis: j.opis,
      cena: j.cena,
      slika: j.slika,
      kolicina: j.kolicina,
      jedinicaMere: j.jedinicaMere
      }
    ), httpOptions);
  }

  obrisiJelo(id:string, korisnikId: string)
  {
    return this.http.delete<Jela>(`${url}/Hrana/ObrisiHranu/${id}?korisnikID=${korisnikId}`);
  }
}
