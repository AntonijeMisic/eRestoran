import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jela } from '../../models/Jela';
import { Korisnik } from '../../models/Korisnik';
import { MeniService } from '../../services/meni.service';
import { Restoran } from '../../models/Restoran';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-jelo-dialog',
  templateUrl: './edit-jelo-dialog.component.html',
  styleUrls: ['./edit-jelo-dialog.component.scss']
})
export class EditJeloDialogComponent implements OnInit {

  public hrana!: Jela;
  public currUser!: Korisnik;
  public restoran!: Restoran;
  public tip!: string;
  public putanjaDoSlike!: string;
  public btnEnabled: boolean=false;

  public nazivInput!: HTMLInputElement;
  public opisInput!: HTMLTextAreaElement;
  public kolicinaInput!: HTMLInputElement;
  public jedinicaInput!: HTMLInputElement;
  public cenaInput!: HTMLInputElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private meniService: MeniService, private toast: NgToastService) {
  }


  ngOnInit(): void {
    this.hrana = this.data.jelo;
    this.tip = this.data.tip;
    this.currUser = this.data.korisnik;
    this.restoran = this.data.restoran;

    this.nazivInput = document.getElementById("nazivInput") as HTMLInputElement;
    this.opisInput = document.getElementById("textAreaInput") as HTMLTextAreaElement;
    this.kolicinaInput = document.getElementById("kolicinaInput") as HTMLInputElement;
    this.kolicinaInput.valueAsNumber = 1;
    this.jedinicaInput = document.getElementById("jedinicaInput") as HTMLInputElement;
    this.cenaInput = document.getElementById("cenaInput") as HTMLInputElement;
    this.cenaInput.valueAsNumber = 0;

    if (this.hrana != null) {
      //console.log(this.hrana);
      if(this.tip=="Izmeni")
      {
        this.fillInputs();
      }
    }
  }

  fillInputs()
  {
    this.nazivInput.value = this.hrana.naziv;
    this.opisInput.value = this.hrana.opis;
    this.kolicinaInput.valueAsNumber = this.hrana.kolicina;
    this.jedinicaInput.value = this.hrana.jedinicaMere;
    this.cenaInput.valueAsNumber = this.hrana.cena;
  }

  izmeni(naziv:string, opis: string, kolicina:number, cena: number, jedinica:string)
  {
    if(this.hrana!==null)
    {
      if(naziv!=="" && naziv!==null && kolicina!==0 &&  kolicina!==null  && cena!==0 && cena!==null && opis!=="" && opis!==null && jedinica!=="" && jedinica!==null && (jedinica=="g" || jedinica=="l"))
      {
        if(!this.putanjaDoSlike)//ako nije izabrana slika
        {
          let j: Jela ={
            id: this.hrana.id,
            naziv: naziv,
            opis: opis,
            kolicina: kolicina,
            cena: cena,
            jedinicaMere: jedinica,
            slika: this.hrana.slika,
            komentari: this.hrana.komentari,
            ocene: this.hrana.ocene
          }
  
          //console.log(j);
          this.meniService.izmeniJelo(j, this.currUser.id.toString()).subscribe((res)=>{
            //console.log(res);
            this.meniService.updateJelo(j.id.toString());
            this.meniService.updateMeni(this.restoran.id.toString());
            this.meniService.updatePreporucena(this.restoran.id.toString());
          })
        }
        else //ako jeste izabrana slika
        {
          let j: Jela ={
            id: this.hrana.id,
            naziv: naziv,
            opis: opis,
            kolicina: kolicina,
            cena: cena,
            jedinicaMere: jedinica,
            slika: this.putanjaDoSlike,
            komentari: this.hrana.komentari,
            ocene: this.hrana.ocene
          }
  
          //console.log(j);
          this.meniService.izmeniJelo(j, this.currUser.id.toString()).subscribe((res)=>{
            //console.log(res);
            this.meniService.updateJelo(j.id.toString());
            this.meniService.updateMeni(this.restoran.id.toString());
            this.meniService.updatePreporucena(this.restoran.id.toString());
          })
        }
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
      }
    }
    else
    {
      this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
    }
  }
  dodaj(naziv:string, opis: string, kolicina:number, cena: number, jedinica: string)
  {
    if(naziv!=="" && naziv!==null && kolicina!==0 &&  kolicina!==null  && cena!==0 && cena!==null && opis!=="" && opis!==null  && jedinica!=="" && jedinica!==null && (jedinica=="g" || jedinica=="l"))
      {
        if(this.putanjaDoSlike)//ako je izabrana slika
        {
          let j: Jela ={
            id: -1,
            naziv: naziv,
            opis: opis,
            kolicina: kolicina,
            cena: cena,
            jedinicaMere: jedinica,
            slika: this.putanjaDoSlike,
            komentari: [],
            ocene: []
          }

          //console.log(j);
          this.meniService.dodajJelouMeni(this.restoran.id.toString(), this.currUser.id.toString(), j).subscribe((res)=>{
            //console.log(res);
            this.meniService.updateMeni(this.restoran.id.toString());
            this.meniService.updatePreporucena(this.restoran.id.toString());
          })
        }
        else//ako nije izabrana slika
        {
          this.toast.error({detail: "GRESKA", summary: "Niste izabrali sliku", duration: 5000});
        }   
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
      }
    }
    
    handleFileInput(event: any) {
      const putanja="../assets/images/meni/"
      const file = event.target.files[0];
      if(this.isImageFile(file))
      {
        this.putanjaDoSlike = putanja + file.name;
        //console.log('Putanja do slike:', this.putanjaDoSlike );
        // Ovde možete nastaviti s obradom putanje slike
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Izabrani fajl nije slika", duration: 5000});
      }
      
    }

    isImageFile(file: File) {
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
      const fileExtension = this.getFileExtension(file.name);
      const fileType = file.type;
    
      
      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        return true;
      }
      if (allowedMimeTypes.includes(fileType)) {
        return true;
      }
    
      return false;
    }
    
    getFileExtension(filename: string) {
      return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    }

    checkInputFields()
    {
      if (this.nazivInput && this.kolicinaInput && this.cenaInput && this.jedinicaInput && this.opisInput) {
        this.btnEnabled = true;
      } 
      else {
        this.btnEnabled = false;
      }
    }
}

