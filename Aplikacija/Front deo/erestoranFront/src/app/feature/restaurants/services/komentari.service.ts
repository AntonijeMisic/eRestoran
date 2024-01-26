import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Komentar } from '../models/Komentar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class KomentariService {

  private commentsSubject: BehaviorSubject<Komentar[]>=new BehaviorSubject<Komentar[]>([]);
  public komentariRes$=this.commentsSubject.asObservable();
  private commentsHranaSubject: BehaviorSubject<Komentar[]>=new BehaviorSubject<Komentar[]>([]);
  public komentariHrane$=this.commentsHranaSubject.asObservable();

  constructor(private http: HttpClient) { }

  getKomentariRestorana(id:string): Observable<Komentar[]>
  {
    return this.http.get<Komentar[]>(`${url}/Komentar/PrikaziKomentareRestorana/${id}`);
  }

  dodajKomentarRestoranu(idRes:string, idKorisnika:string, kom:string): Observable<Komentar>
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Komentar>(`${url}/Komentar/KomentarisiRestoran/${idRes}?korisnikID=${idKorisnika}`, JSON.stringify({tekst: kom}), httpOptions);
  }

  updateKomentari(id:string)
  {
    this.getKomentariRestorana(id).subscribe((kom: Komentar[])=>{
      this.commentsSubject.next(kom);
    },
    () => {
      this.commentsSubject.next([]); // Resetuj meni na prazan niz u slučaju greške
    }
    );
  }

  getKomentareJela(id: string)
  {
    return this.http.get<Komentar[]>(`${url}/Komentar/PrikaziKomentareHrane/${id}`);
  }

  dodajKomentarHrane(idHrane: string, idKorisnika: string, kom: string)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Komentar>(`${url}/Komentar/KomentarisiHranu/${idHrane}?korisnikID=${idKorisnika}`, JSON.stringify({tekst: kom}), httpOptions);
  }

  izmeniKomentarHrane(hranaId:string, korisnikId:string, komId:string, komentar:string)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Komentar>(`${url}/Komentar/IzmeniKomentarHrane/${hranaId}?korisnikID=${korisnikId}&komentarID=${komId}`, JSON.stringify(komentar), httpOptions )
  }
  obrisiKomentarHrane(hranaId:string, korisnikId:string, komId:string)
  {
    return this.http.delete<Komentar>(`${url}/Komentar/ObrisiKomentarHrane/${hranaId}?korisnikID=${korisnikId}&komentarID=${komId}`);
  }
  izmeniKomentarRestorana(resId:string, korisnikId:string, komId: string, komentar: string)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Komentar>(`${url}/Komentar/IzmeniKomentarRestorana/${resId}?korisnikID=${korisnikId}&komentarID=${komId}`, JSON.stringify(komentar), httpOptions);
  }
  obrisiKomentarRestorana(resId:string, korisnikId:string, komId:string)
  {
    return this.http.delete<Komentar>(`${url}/Komentar/ObrisiKomentarRestorana/${resId}?korisnikID=${korisnikId}&komentarID=${komId}`);
  }

  updateKomentareHrane(id:string)
  {
    this.getKomentareJela(id).subscribe((kom: Komentar[])=>{
      this.commentsHranaSubject.next(kom);
    },
    () => {
      this.commentsHranaSubject.next([]); // Resetuj meni na prazan niz u slučaju greške
    });
  }

  prikaziVreme(vreme: Date) : string {
    let trenutnoVreme = new Date();
    vreme = new Date(vreme);

    let razlika = (
      Date.UTC(
        trenutnoVreme.getFullYear(), 
        trenutnoVreme.getMonth(), 
        trenutnoVreme.getDate(), 
        trenutnoVreme.getHours(), 
        trenutnoVreme.getMinutes(), 
        trenutnoVreme.getSeconds()
      ) - Date.UTC(
        vreme.getFullYear(), 
        vreme.getMonth(), 
        vreme.getDate(),
        vreme.getHours(), 
        vreme.getMinutes(), 
        vreme.getSeconds()
      )
    );
    let sekundi = Math.floor(razlika / 1000);
    let minuti = Math.floor(sekundi / 60);
    let sati = Math.floor(minuti / 60);
    let dani = Math.floor(sati / 24);
    let meseci = Math.floor(dani / 30);
    let godine = Math.floor(meseci / 12);

    if (godine > 0) {
      if (godine == 1) return "pre godinu dana";
      return `pre ${godine} godin${godine >= 5 ? 'a' : 'e'}`;
    }
    if (meseci > 0) {
      if (meseci == 1) return "pre mesec dana";
      return `pre ${meseci} mesec${meseci >= 5 ? 'i' : 'a'}`;
    }
    if (dani > 0) {
      if (dani == 1) return "juče";
      return `pre ${dani} dan${dani != 21 ? 'a' : ''}`;
    }
    if (sati > 0) {
      if (sati == 1) return "pre sat vremena";
      if (sati < 5 || sati > 21) return `pre ${sati} sata`
      return `pre ${sati} sat${sati != 21 ? 'i' : ''}`;
    }
    if (minuti > 0) return `pre ${minuti} minut${minuti % 10 != 1 && minuti != 11 ? 'a' : ''}`;
    if (sekundi > 0) return `pre ${sekundi} sekund${(sekundi % 10 >= 5 || sekundi % 10 == 0) || (sekundi >= 11 && sekundi <= 14) ? 'i' : 'e'}`;
    return "upravo sada";
  }

}
