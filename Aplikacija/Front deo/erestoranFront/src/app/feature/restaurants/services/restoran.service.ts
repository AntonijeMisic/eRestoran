import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Restoran } from '../models/Restoran';
import { BehaviorSubject } from 'rxjs';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class RestoranService {

  private restoraniSubject: BehaviorSubject<Restoran[]>=new BehaviorSubject<Restoran[]>([]);
  public restorani$=this.restoraniSubject.asObservable();
  private resSubject: BehaviorSubject<Restoran>=new BehaviorSubject<Restoran>({} as Restoran);
  public restoran$=this.resSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<Restoran[]>(`${url}/Restoran/PrikaziRestorane`);
  }
  getRestoranById(id: string)
  {
    return this.http.get<Restoran>(`${url}/Restoran/PrikaziRestoran/${id}`);
  }
  postaviRestoran(r: Restoran)
  {
    this.resSubject.next(r);
  }

  updateRestorani()
  {
    this.getAll().subscribe((r: Restoran[])=>{
      this.restoraniSubject.next(r);
    });
  }

  updateRestoran(id:string)
  {
    this.getRestoranById(id).subscribe((r: Restoran)=>{
      this.resSubject.next(r);
    });
  }

  dodajRestoran(r: Restoran)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Restoran>(`${url}/Restoran/UnesiRestoran`, JSON.stringify(
      {
      naziv: r.naziv,
      opis: r.opis,
      adresa: r.adresa,
      slika: r.slika
      }
    ), httpOptions);
  }

  izmeniRestoran(id: string, r: Restoran)
  {
    const httpOptions={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Restoran>(`${url}/Restoran/IzmeniRestoran/${id}`, JSON.stringify(
      {
      naziv: r.naziv,
      opis: r.opis,
      adresa: r.adresa,
      slika: r.slika
      }
    ), httpOptions);
  }
  
  obrisiRestoran(id: string)
  {
    return this.http.delete<Restoran>(`${url}/Restoran/ObrisiRestoran/${id}`);
  }
  
  getPreporuceniRestorani()
  {
    return this.http.get<Restoran[]>(`${url}/Restoran/PreporuceniRestorani`);
  }
  
  
  
  
}
