import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/Rezervacija';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  constructor(private http: HttpClient) { }

  unesiRezervaciju(rez: Rezervacija, stoId: string, korisnikId: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Rezervacija>(`${url}/Rezervacija/Rezervisi/${stoId}?korisnikID=${korisnikId}`, 
      JSON.stringify({
        brojLjudi: rez.brojLjudi,
        datumRezervacije: rez.datumRezervacije
      }), httpOptions
    );
  }

  obrisiRezervaciju(rezervacijaId: string) {
    return this.http.delete<Rezervacija>(`${url}/Rezervacija/ObrisiRezervaciju/${rezervacijaId}`);
  }
}
