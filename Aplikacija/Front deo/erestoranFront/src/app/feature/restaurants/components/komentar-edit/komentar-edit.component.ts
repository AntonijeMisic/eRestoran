import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestoranService } from '../../services/restoran.service';
import { Komentar } from '../../models/Komentar';
import { Korisnik } from '../../models/Korisnik';
import { Restoran } from '../../models/Restoran';
import { KomentariService } from '../../services/komentari.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-komentar-edit',
  templateUrl: './komentar-edit.component.html',
  styleUrls: ['./komentar-edit.component.scss']
})
export class KomentarEditComponent implements OnInit {

  public btnEnabled:boolean=false;
  public kom!: Komentar;
  public korisnik!: Korisnik;
  public noviKomentar!: Komentar;
  public restoran!: Restoran;
  res: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private commentsService: KomentariService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.kom = this.data.komentar;
    this.korisnik = this.data.korisnik;
    this.restoran=this.data.restoran;
    
    if (this.data.komentar != null) {
      this.fillTextBox(this.data.komentar.tekst);
    }
  }

  checkTextbox(kom: string)
  {
    if (kom.length != 0)
      this.btnEnabled = true;
    else
      this.btnEnabled = false;
  }
  postaviKomentar(kom:string)
  {
    if(this.data.komentar)//ako postoji onda radi izmenu
    {
      if(kom!==null && kom!=="")
      {
        this.commentsService.izmeniKomentarRestorana(this.restoran.id.toString(), this.korisnik.id.toString(), this.data.komentar.id.toString(), kom).subscribe((res)=>{
          console.log(res);
          this.noviKomentar=res;
          this.commentsService.updateKomentari(this.restoran.id.toString());
        });
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
      }    
    }
  }

  fillTextBox(kom: string)
  {
    const textArea: HTMLTextAreaElement = document.querySelector("#textAreaInput")! as HTMLTextAreaElement;
    console.log(textArea);
    textArea.innerHTML = kom;
    this.checkTextbox(kom);
  }

}
