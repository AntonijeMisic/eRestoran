import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sto } from '../../models/Sto';
import { Korisnik } from '../../models/Korisnik';
import { Rezervacija } from '../../models/Rezervacija';
import { RezervacijaService } from '../../services/rezervacija.service';
import { SalaService } from '../../services/sala.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-rezervacija-dialog',
  templateUrl: './rezervacija-dialog.component.html',
  styleUrls: ['./rezervacija-dialog.component.scss']
})
export class RezervacijaDialogComponent implements OnInit {

  public sto!: Sto;
  public datum!: Date;
  public rezervacija!: Rezervacija | null;
  public currentKorisnik!: Korisnik;

  public salaId!: number;

  public brojLjudiInput!: HTMLInputElement;

  public novaRezervacija: Rezervacija | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RezervacijaService, private toast: NgToastService, private salaService: SalaService) { }

  ngOnInit(): void {
    this.currentKorisnik = this.data.korisnik;
    this.sto = this.data.sto as Sto;
    this.datum = this.data.datum;
    this.rezervacija = this.getRezervacija(this.sto, this.datum);

    this.salaId = this.data.salaId;

    this.brojLjudiInput = document.getElementById('brojLjudi') as HTMLInputElement;
    this.brojLjudiInput.valueAsNumber = 2;

    //console.log(this.currentKorisnik);
    //console.log(this.sto);
    //console.log(this.datum);
    //console.log(this.rezervacija);

    //console.log(this.salaId);
  }

  checkLogIn()
  {
    if(this.currentKorisnik) return true;
    else return false;
  }

  checkUserAdmin()
  {
    if(this.checkLogIn())
    {
      if(this.currentKorisnik.tip=="Admin")
        return true;
    }

    return false;
  }

  checkRezervacijaOwner() {
    if (this.currentKorisnik != undefined && this.rezervacija != undefined) {
      if (this.rezervacija.korisnik.id == this.currentKorisnik.id) {
        return true;
      }
    }
    return false;
  }

  checkRezervisano() : boolean {
    if (this.rezervacija) return true;
    else return false;
  }

  getRezervacija(sto: Sto, datum: Date) : Rezervacija | null {
    for (let i = 0; i < sto.rezervacije.length; i++) {
      let datumRezervacijeStola: Date = new Date(sto.rezervacije[i].datumRezervacije);
      let dan: number = datumRezervacijeStola.getDate();
      let mesec: number = datumRezervacijeStola.getMonth();
      let godina: number = datumRezervacijeStola.getFullYear();
      if (dan == datum.getDate() && mesec == datum.getMonth() && godina == datum.getFullYear()) {
        return sto.rezervacije[i];
      }
    }
    return null;
  }

  rezervisi() {
    let novoVreme = new Date(this.datum);
    novoVreme.setHours(0, -this.datum.getTimezoneOffset(), 0, 0); //ide minus jer getTimeZoneOffset radi UTCVreme - lokalnoVreme
    //console.log(novoVreme);

    this.novaRezervacija = {
      id: -1,
      korisnik: this.currentKorisnik,
      sto: this.sto,
      brojLjudi: this.brojLjudiInput.valueAsNumber,
      datumRezervacije: novoVreme
    }

    //console.log(this.novaRezervacija);

    this.service.unesiRezervaciju(this.novaRezervacija, this.sto.id.toString(), this.currentKorisnik.id.toString()).subscribe(res => {
      //console.log(res);
      this.salaService.updateStolovi(this.salaId.toString());
    }, err => {
      this.toast.error({detail: "GREŠKA", summary: err.error, duration: 5000});
      //this.salaService.updateStolovi(this.salaId.toString());
    });
  }

  otkazi() {
    this.service.obrisiRezervaciju(this.rezervacija!.id.toString()).subscribe(res => {
      //console.log(res);
      this.salaService.updateStolovi(this.salaId.toString());
    })
  }
}
