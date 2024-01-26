import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sala } from '../models/Sala';
import { Sto } from '../models/Sto';
import { ObjekatSale } from '../models/ObjekatSale';
import { url } from 'environments/environments.prod';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  public stoloviSubject: BehaviorSubject<Sto[]> = new BehaviorSubject<Sto[]>([]);
  public stolovi$: Observable<Sto[]> = this.stoloviSubject.asObservable();

  constructor(private http: HttpClient) { }

  getSaleByRestoranId(id: string)
  {
    return this.http.get<Sala[]>(`${url}/Sala/PrikaziSaleRestorana/${id}`);
  }



  getStoloveBySalaId(id: string)
  {
    return this.http.get<Sto[]>(`${url}/Sto/PrikaziStolove/${id}`);
  }

  setStolovi(stolovi: Sto[]) {
    if (stolovi) {
      this.stoloviSubject.next(stolovi);
    }
  }

  updateStolovi(salaId: string) {
    this.getStoloveBySalaId(salaId).subscribe((res) => {
      this.stoloviSubject.next(res);
    },
    () => {
      this.stoloviSubject.next([]); // Resetuj jelo na prazan obj u slučaju greške
    });
  }



  unesiSalu(restoranId: string, sala: Sala) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Sala>(`${url}/Sala/DodajSalu/${restoranId}`, 
      JSON.stringify({
        duzina: sala.duzina,
        sirina: sala.sirina
      }), httpOptions
    );
  }

  

  unesiSto(salaId: string, sto: Sto) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<Sto>(`${url}/Sto/DodajSto/${salaId}`, 
      JSON.stringify({
        naziv: sto.naziv,
        pozicijaX: sto.pozicijaX,
        pozicijaY: sto.pozicijaY,
        sirina: sto.sirina,
        duzina: sto.duzina,
        brojMesta: sto.brojMesta
      }), httpOptions
    );
  }

  izmeniSto(stoId: string, sto: Sto)
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<Sto>(`${url}/Sto/IzmeniSto/${stoId}?`, 
      JSON.stringify({
        naziv: sto.naziv,
        pozicijaX: sto.pozicijaX,
        pozicijaY: sto.pozicijaY,
        sirina: sto.sirina,
        duzina: sto.duzina,
        brojMesta: sto.brojMesta
      }), httpOptions
    );
  }

  obrisiSto(stoId: string) {
    return this.http.delete<Sto>(`${url}/Sto/ObrisiSto/${stoId}`);
  }



  unesiPredmet(salaId: string, predmet: ObjekatSale) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<ObjekatSale>(`${url}/Predmet/DodajPredmet/${salaId}`, 
      JSON.stringify({
        naziv: predmet.naziv,
        pozicijaX: predmet.pozicijaX,
        pozicijaY: predmet.pozicijaY,
        sirina: predmet.sirina,
        duzina: predmet.duzina,
      }), httpOptions
    );
  }

  izmeniPredmet(predmetId: string, predmet: ObjekatSale)
  {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put<ObjekatSale>(`${url}/Predmet/IzmeniPredmet/${predmetId}?`, 
      JSON.stringify({
        naziv: predmet.naziv,
        pozicijaX: predmet.pozicijaX,
        pozicijaY: predmet.pozicijaY,
        sirina: predmet.sirina,
        duzina: predmet.duzina,
      }), httpOptions
    );
  }

  obrisiPredmet(predmetId: string) {
    return this.http.delete<ObjekatSale>(`${url}/Predmet/ObrisiPredmet${predmetId}`);
  }
}
