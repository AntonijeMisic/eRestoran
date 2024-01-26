import { Injectable } from '@angular/core';
import { Ocena } from '../models/Ocena';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class OcenaService {

  private pOcenaSubject: BehaviorSubject<number>=new BehaviorSubject<number>({} as number);
  public prosecnaRes$ = this.pOcenaSubject.asObservable();

  private pOcenaHraneSubject: BehaviorSubject<number>=new BehaviorSubject<number>({} as number);
  public prosecnaHrana$ = this.pOcenaHraneSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProsecnaOcenaRestorana(id:string)
  {
    return this.http.get<number>(`${url}/Ocena/ProsecnaOcenaRestorana/${id}`);
  }

  getProsecnaOcenaHrane(id:string)
  {
    return this.http.get<number>(`${url}/Ocena/ProsecnaOcenaHrane/${id}`);
  }

  postaviProsecnu(o: number)
  {
    this.pOcenaSubject.next(o);
  }

  postaviProsecnuHrana(o: number)
  {
    this.pOcenaHraneSubject.next(o);
  }

  updateProsecnuOcenu(resId: string)
  {
    this.getProsecnaOcenaRestorana(resId).subscribe((o: number)=>{
      this.pOcenaSubject.next(o);
    });
  }

  updateProsecnuOcenuHrane(hranasId: string)
  {
    this.getProsecnaOcenaHrane(hranasId).subscribe((o: number)=>{
      this.pOcenaHraneSubject.next(o);
    });
  }

  dajOcenuRestoranu(resId: string, korisnikId: string, ocena: number)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Ocena>(`${url}/Ocena/OceniRestoran/${resId}?korisnikID=${korisnikId}`, JSON.stringify(
      {
        vrednost: ocena
      }
    ), httpOptions);
  }

  dajOcenuHrani(hranaId: string, korisnikId: string, ocena: number)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Ocena>(`${url}/Ocena/OceniHranu/${hranaId}?korisnikID=${korisnikId}`, JSON.stringify(
      {
        vrednost: ocena
      }
    ), httpOptions);
  }
}
