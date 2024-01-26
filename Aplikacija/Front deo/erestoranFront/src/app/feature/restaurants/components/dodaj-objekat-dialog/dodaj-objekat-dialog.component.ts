import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Sala } from '../../models/Sala';
import { Sto } from '../../models/Sto';
import { ObjekatSale } from '../../models/ObjekatSale';

@Component({
  selector: 'app-dodaj-objekat-dialog',
  templateUrl: './dodaj-objekat-dialog.component.html',
  styleUrls: ['./dodaj-objekat-dialog.component.scss']
})
export class DodajObjekatDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  public trenutnaSala!: Sala;

  public optionPressed: boolean = false;
  public stoObjekat: boolean = false;

  public nazivInput!: HTMLInputElement;
  public pozXInput!: HTMLInputElement;
  public pozYInput!: HTMLInputElement;
  public sirinaInput!: HTMLInputElement;
  public duzinaInput!: HTMLInputElement;
  public brojMestaInput!: HTMLInputElement;

  ngOnInit(): void {
    this.optionPressed = false;

    this.nazivInput = document.getElementById('naziv') as HTMLInputElement;
    
    this.pozXInput = document.getElementById('pozX') as HTMLInputElement;
    this.pozXInput.valueAsNumber = 0;
    this.pozYInput = document.getElementById('pozY') as HTMLInputElement;
    this.pozYInput.valueAsNumber = 0;
    this.sirinaInput = document.getElementById('sirina') as HTMLInputElement;
    this.sirinaInput.valueAsNumber = 1;
    this.duzinaInput = document.getElementById('duzina') as HTMLInputElement;
    this.duzinaInput.valueAsNumber = 1;
    this.brojMestaInput = document.getElementById('brojMesta') as HTMLInputElement;
    this.brojMestaInput.valueAsNumber = 2;

    this.trenutnaSala = this.data.sala;
    console.log(this.trenutnaSala);
  }

  changeState(broj: number) {
    this.optionPressed = true;
    if (broj == 1) this.stoObjekat = true;
    if (broj == 2) this.stoObjekat = false;
  }

  dodajSto() {
    let proveraX = this.sirinaInput.valueAsNumber + this.pozXInput.valueAsNumber;
    if (proveraX > this.trenutnaSala.sirina || this.pozXInput.valueAsNumber < 0) return;
    let proveraY = this.duzinaInput.valueAsNumber + this.pozYInput.valueAsNumber;
    if (proveraY > this.trenutnaSala.duzina || this.pozYInput.valueAsNumber < 0) return;

    let noviSto: Sto = {
      id: -1,
      naziv: this.nazivInput.value,
      sirina: this.sirinaInput.valueAsNumber,
      duzina: this.duzinaInput.valueAsNumber,
      pozicijaX: this.pozXInput.valueAsNumber,
      pozicijaY: this.pozYInput.valueAsNumber,
      brojMesta: this.brojMestaInput.valueAsNumber,
      rezervacije: []
    }

    this.trenutnaSala.stolovi.push(noviSto);
  }

  dodajObjekat()
  {
    let proveraX = this.sirinaInput.valueAsNumber + this.pozXInput.valueAsNumber;
    if (proveraX > this.trenutnaSala.sirina || this.pozXInput.valueAsNumber < 0) return;
    let proveraY = this.duzinaInput.valueAsNumber + this.pozYInput.valueAsNumber;
    if (proveraY > this.trenutnaSala.duzina || this.pozYInput.valueAsNumber < 0) return;

    let noviObj: ObjekatSale = {
      id: -1,
      naziv: this.nazivInput.value,
      sirina: this.sirinaInput.valueAsNumber,
      duzina: this.duzinaInput.valueAsNumber,
      pozicijaX: this.pozXInput.valueAsNumber,
      pozicijaY: this.pozYInput.valueAsNumber
    }

    this.trenutnaSala.predmeti.push(noviObj);
  }
}
