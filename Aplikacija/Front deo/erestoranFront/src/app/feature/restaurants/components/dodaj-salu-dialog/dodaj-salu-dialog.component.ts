import { Component, Inject, OnInit } from '@angular/core';
import { SalaService } from '../../services/sala.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sala } from '../../models/Sala';
import { Restoran } from '../../models/Restoran';

@Component({
  selector: 'app-dodaj-salu-dialog',
  templateUrl: './dodaj-salu-dialog.component.html',
  styleUrls: ['./dodaj-salu-dialog.component.scss']
})
export class DodajSaluDialogComponent implements OnInit  {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: SalaService) { }

  public trenutniRestoran!: Restoran;

  public sirinaInput!: HTMLInputElement;
  public duzinaInput!: HTMLInputElement;

  public novaSala!: Sala;

  ngOnInit(): void {
    this.sirinaInput = document.getElementById('sirina') as HTMLInputElement;
    this.sirinaInput.valueAsNumber = 5;
    this.duzinaInput = document.getElementById('duzina') as HTMLInputElement;
    this.duzinaInput.valueAsNumber = 5;

    this.trenutniRestoran = this.data.restoran;
  }

  dodajSalu() {
    let sirinaSale = this.sirinaInput.valueAsNumber;
    let duzinaSale = this.duzinaInput.valueAsNumber;
    if (this.duzinaInput.valueAsNumber > this.sirinaInput.valueAsNumber) {
      let pom = sirinaSale;
      sirinaSale = duzinaSale;
      duzinaSale = pom;
    }

    console.log(sirinaSale, duzinaSale);

    this.novaSala = {
      id: -1,
      sirina: sirinaSale,
      duzina: duzinaSale,
      stolovi: [],
      predmeti: []
    }

    this.trenutniRestoran.sale.push(this.novaSala);
    this.service.unesiSalu(this.trenutniRestoran.id.toString(), this.novaSala).subscribe(res => {
      console.log(res);
    })
  }

}
