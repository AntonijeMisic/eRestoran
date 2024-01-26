import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ObjekatSale } from '../../models/ObjekatSale';
import { Sto } from '../../models/Sto';
import { Sala } from '../../models/Sala';

@Component({
  selector: 'app-edit-obj-dialog',
  templateUrl: './edit-obj-dialog.component.html',
  styleUrls: ['./edit-obj-dialog.component.scss']
})
export class EditObjDialogComponent implements OnInit {

  public stoObjekat: boolean = false;

  public nazivInput!: HTMLInputElement;
  public pozXInput!: HTMLInputElement;
  public pozYInput!: HTMLInputElement;
  public sirinaInput!: HTMLInputElement;
  public duzinaInput!: HTMLInputElement;
  public brojMestaInput!: HTMLInputElement;
  
  public obj!: Sto | ObjekatSale;
  public sirinaSale: number = 0;
  public duzinaSale: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obj = this.data.obj;
    this.sirinaSale = this.data.sirinaSale;
    this.duzinaSale = this.data.duzinaSale;

    this.nazivInput = document.getElementById('naziv') as HTMLInputElement;
    this.nazivInput.value = this.obj.naziv;
    this.pozXInput = document.getElementById('pozX') as HTMLInputElement;
    this.pozXInput.valueAsNumber = this.obj.pozicijaX;
    this.pozYInput = document.getElementById('pozY') as HTMLInputElement;
    this.pozYInput.valueAsNumber = this.obj.pozicijaY;
    this.sirinaInput = document.getElementById('sirina') as HTMLInputElement;
    this.sirinaInput.valueAsNumber = this.obj.sirina;
    this.duzinaInput = document.getElementById('duzina') as HTMLInputElement;
    this.duzinaInput.valueAsNumber = this.obj.duzina;

    if (this.checkType(this.obj)) {
      this.stoObjekat = true;
      this.brojMestaInput= document.getElementById('brojMesta') as HTMLInputElement;
      this.brojMestaInput.valueAsNumber = (this.obj as Sto).brojMesta;
    }
  }

  checkType(obj: Sto | ObjekatSale)
  {
    return (<Sto>obj).brojMesta !== undefined;
  }

  izmeniObjekat()
  {
    let proveraX = this.sirinaInput.valueAsNumber + this.pozXInput.valueAsNumber;
    let proveraY = this.duzinaInput.valueAsNumber + this.pozYInput.valueAsNumber;
    console.log(this.sirinaSale, this.duzinaSale);
    if (proveraX > this.sirinaSale || this.pozXInput.valueAsNumber < 0) return;
    if (proveraY > this.duzinaSale || this.pozYInput.valueAsNumber < 0) return;

    console.log("unos je validan");

    if(this.stoObjekat)
    {
      let noviSto: Sto = this.obj as Sto;

      if (this.nazivInput.value && this.nazivInput.value !== "")
        noviSto.naziv = this.nazivInput.value;
      
      noviSto.pozicijaX = this.pozXInput.valueAsNumber;
      noviSto.pozicijaY = this.pozYInput.valueAsNumber;
      noviSto.sirina = this.sirinaInput.valueAsNumber;
      noviSto.duzina = this.duzinaInput.valueAsNumber;
      noviSto.brojMesta = this.brojMestaInput.valueAsNumber;
    }
    else
    {
      let noviPredmet: ObjekatSale = this.obj as ObjekatSale;

      if (this.nazivInput.value && this.nazivInput.value !== "")
        noviPredmet.naziv = this.nazivInput.value;
      
      noviPredmet.pozicijaX = this.pozXInput.valueAsNumber;
      noviPredmet.pozicijaY = this.pozYInput.valueAsNumber;
      noviPredmet.sirina = this.sirinaInput.valueAsNumber;
      noviPredmet.duzina = this.duzinaInput.valueAsNumber;
    }
  }

}
