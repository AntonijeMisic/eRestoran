import { Component, Inject, OnInit } from '@angular/core';
import { Jela } from '../../models/Jela';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Komentar } from '../../models/Komentar';
import { Korisnik } from '../../models/Korisnik';
import { HttpClient } from '@angular/common/http';
import { RestoranService } from '../../services/restoran.service';
import { KomentariComponent } from '../komentari/komentari.component';
import { KomentariService } from '../../services/komentari.service';

@Component({
  selector: 'app-add-hrana-kom',
  templateUrl: './add-hrana-kom.component.html',
  styleUrls: ['./add-hrana-kom.component.scss']
})
export class AddHranaKomComponent implements OnInit {

  public hrana!: Jela;
  public korisnik!: Korisnik;
  public noviKomentar!: Komentar;
  public btnEnabled: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RestoranService, private commService: KomentariService) { }

  ngOnInit(): void {
    this.hrana = this.data.hrana;
    this.korisnik = this.data.korisnik;
    if (this.data.komentar != null) {
      this.fillTextBox(this.data.komentar.tekst);
    }
  }

  postaviKomentar(kom: string) {

    if(this.data.komentar)//ako postoji onda radi izmenu
    {
      this.noviKomentar = this.data.komentar;
      this.noviKomentar.tekst = kom;

      this.commService.izmeniKomentarHrane(this.hrana.id.toString(), this.korisnik.id.toString(), this.noviKomentar.id.toString(), kom).subscribe((res)=>{
        //console.log(res);

        // const index = this.hrana.komentari.indexOf(this.noviKomentar, 0);
        // if (index > -1) {
        //   this.hrana.komentari[index] = this.noviKomentar;
        // }
        this.commService.updateKomentareHrane(this.hrana.id.toString());
      });
    }
    else
    {
      this.commService.dodajKomentarHrane(this.hrana.id.toString(), this.korisnik.id.toString(), kom).subscribe(
        (res)=>{
          //console.log(res);
          this.noviKomentar=res;
          this.commService.updateKomentareHrane(this.hrana.id.toString());
        }
      );
    }
    
  }

  checkTextbox(kom: string)
  {
    if (kom.length != 0)
      this.btnEnabled = true;
    else
      this.btnEnabled = false;
  }

  fillTextBox(kom: string)
  {
    const textArea: HTMLTextAreaElement = document.querySelector("#textAreaInput")! as HTMLTextAreaElement;
    //console.log(textArea);
    textArea.innerHTML = kom;
    this.checkTextbox(kom);
  }
}
