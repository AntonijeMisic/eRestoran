import { Component, Inject, OnInit } from '@angular/core';
import { RestoranService } from '../../services/restoran.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Restoran } from '../../models/Restoran';
import { Korisnik } from '../../models/Korisnik';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-restoran-dijalog',
  templateUrl: './edit-restoran-dijalog.component.html',
  styleUrls: ['./edit-restoran-dijalog.component.scss']
})
export class EditRestoranDijalogComponent implements OnInit {

  public tip!: string;
  public restoran!: Restoran;
  public currUser!: Korisnik;
  putanjaDoSlike!: string;
  public btnEnabled: boolean = false;

  public nazivInput!: HTMLInputElement;
  public opisInput!: HTMLTextAreaElement;
  public adresaInput!: HTMLInputElement;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: RestoranService, private toast: NgToastService) {}


  ngOnInit(): void {
    this.restoran = this.data.restoran;
    this.currUser = this.data.korisnik;
    this.tip = this.data.tip;

    this.nazivInput = document.getElementById('nazivInput') as HTMLInputElement;
    this.opisInput = document.getElementById('textAreaInput') as HTMLTextAreaElement;
    this.adresaInput = document.getElementById('adresaInput') as HTMLInputElement;

    if (this.restoran != null) {
      //console.log(this.restoran);
      if(this.tip=="Izmeni")
      {
        this.fillInputs();
      }
    }
  }

  fillInputs()
  {
    this.nazivInput.value = this.restoran.naziv;
    this.adresaInput.value = this.restoran.adresa;
    this.opisInput.value = this.restoran.opis;
  }

  izmeniRestoran(naziv: string, opis: string, adresa: string)
  {
    if(this.restoran!==null)
    {
      if(naziv!=="" && naziv!==null && opis!=="" && opis!==null && adresa!==null && adresa!=="")
      {
        if(!this.putanjaDoSlike)
        {
          let r: Restoran ={
            id: this.restoran.id,
            naziv: naziv,
            opis: opis,
            adresa: adresa,
            meni: this.restoran.meni,
            sale: this.restoran.sale,
            slika: this.restoran.slika,
            komentari: this.restoran.komentari,
            ocene: this.restoran.ocene
          }
  
          //console.log(r);
          this.service.izmeniRestoran(this.restoran.id.toString(), r).subscribe((res)=>{
            //console.log(res);
            this.restoran = r;
            //this.service.updateRestoran(r.id.toString());
            //this.service.updateRestorani();
          })
        }
        else
        {
          let r: Restoran ={
            id: this.restoran.id,
            naziv: naziv,
            opis: opis,
            adresa: adresa,
            meni: this.restoran.meni,
            sale: this.restoran.sale,
            slika: this.putanjaDoSlike,
            komentari: this.restoran.komentari,
            ocene: this.restoran.ocene
          }
  
          //console.log(r);
          this.service.izmeniRestoran(this.restoran.id.toString(), r).subscribe((res)=>{
            //console.log(res);
            this.service.updateRestoran(r.id.toString());
            this.service.updateRestorani();
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

  dodajRestoran(naziv: string, opis: string, adresa: string)
  {
      if(naziv!=="" && naziv!==null && opis!=="" && opis!==null && adresa!==null && adresa!=="")
      {
        if(this.putanjaDoSlike)
        {
          let r: Restoran ={
            id: -1,
            naziv: naziv,
            opis: opis,
            adresa: adresa,
            meni: [],
            sale: [],
            slika: this.putanjaDoSlike,
            komentari: [],
            ocene: []
          }
  
          //console.log(r);
          this.service.dodajRestoran(r).subscribe((res)=>{
            //console.log(res);
            this.service.updateRestorani();
          })
        }
        else
        {
          this.toast.error({detail: "GRESKA", summary: "Slika restorana nije izabrana", duration: 5000});
        }
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
      }
  }

  handleFileInput(event: any) {
    const putanja="../assets/images/restorani/"
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
      if (this.nazivInput && this.adresaInput && this.opisInput) {
        this.btnEnabled = true;
      } 
      else {
        this.btnEnabled = false;
      }
    }

}
