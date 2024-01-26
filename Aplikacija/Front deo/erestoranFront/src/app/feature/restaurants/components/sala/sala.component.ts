import { Component, Input, OnInit } from '@angular/core';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { ActivatedRoute, Route } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerDropdownPositionX } from '@angular/material/datepicker';
import { Sala } from '../../models/Sala';
import { Sto } from '../../models/Sto';
import { RezervacijaDialogComponent } from '../rezervacija-dialog/rezervacija-dialog.component';
import { SalaService } from '../../services/sala.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { DodajObjekatDialogComponent } from '../dodaj-objekat-dialog/dodaj-objekat-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Korisnik } from '../../models/Korisnik';
import { ObjekatSale } from '../../models/ObjekatSale';
import { EditObjDialogComponent } from '../edit-obj-dialog/edit-obj-dialog.component';
import { Rezervacija } from '../../models/Rezervacija';
import { DodajSaluDialogComponent } from '../dodaj-salu-dialog/dodaj-salu-dialog.component';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.scss']
})
export class SalaComponent implements OnInit {

  @Input() xPosition: DatepickerDropdownPositionX = "end";

  public datum: Date = new Date();
  public minDate: Date; 
  public maxDate: Date; 
  public restoran!: Restoran;
  public sale: Sala[] = [];
  public stoloviSale: Sto[] = [];
  public predmetiSale: ObjekatSale[] = [];
  public clickedObj!: Sto | ObjekatSale | null;
  public clickedObjDiv!: HTMLDivElement | null;
  public currentKorisnik!: Korisnik;

  public currentSala!: Sala;
  public selectedSalaIndex: number = -1;

  public vidljivo: boolean = true;

  public sirinaSale: number = 0; //u metrima
  public duzinaSale: number = 0; //u metrima

  public staroX: number = 0;
  public staroY: number = 0;
  public editMode=false;

  constructor(private service: RestoranService, private route: ActivatedRoute, private dialog: MatDialog, private salaService: SalaService, private auth: AuthService, private userService: UserService){
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getDate());
  }

  ngOnInit(): void {
    let id: string | null = this.auth.getUserIdFromStorage();
    if(id !== null)
    {
      this.userService.getUserById(id).subscribe(
        (res)=>{
          this.currentKorisnik=res;
        }
      );
    }

    this.route.params.subscribe(
      params=>{
        if(params['id'])
        {
          let id=params['id'];
          this.service.getRestoranById(id.toString()).subscribe((res)=>{
            this.restoran = res;
            this.salaService.getSaleByRestoranId(id.toString()).subscribe((res)=>{
              this.sale = res;
              if (this.sale.length > 0)
              {
                this.selectedSalaIndex = 0;
                this.duzinaSale = this.sale[this.selectedSalaIndex].duzina; //u metrima
                this.sirinaSale = this.sale[this.selectedSalaIndex].sirina; //u metrima
                //this.stoloviSale = this.sale[this.selectedSalaIndex].stolovi;
                this.predmetiSale = this.sale[this.selectedSalaIndex].predmeti;

                this.salaService.setStolovi(this.sale[this.selectedSalaIndex].stolovi);
                this.salaService.stolovi$.subscribe((res) => {
                  this.stoloviSale = res;
                })

                this.crtajSalu();
                //console.log(this.datum);
              }
            })
          });
        }
    });    
  }

  promeniIndex(broj: number) {
    if (broj >= 0 && broj < this.sale.length) {
      this.selectedSalaIndex = broj;
      this.duzinaSale = this.sale[this.selectedSalaIndex].duzina; //u metrima
      this.sirinaSale = this.sale[this.selectedSalaIndex].sirina; //u metrima
      this.stoloviSale = this.sale[this.selectedSalaIndex].stolovi;
      this.predmetiSale = this.sale[this.selectedSalaIndex].predmeti;
      this.crtajSalu();
    }
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

  openEditMode()
  {
    if (this.currentKorisnik.tip == "Admin") {
      console.log("usao u edit mode");
      this.editMode=true;
      this.vidljivo=true;

      this.setCurrentSala();
    }
  }
  
  closeEditMode() {
    this.editMode=false;
    this.salaService.getSaleByRestoranId(this.restoran.id.toString()).subscribe((res)=>{
      //console.log(res);
      if (res.length > 0) {
        this.sale = res;
        this.duzinaSale = this.sale[this.selectedSalaIndex].duzina; //u metrima
        this.sirinaSale = this.sale[this.selectedSalaIndex].sirina; //u metrima

        /*this.salaService.getStoloveBySalaId("1").subscribe((res)=>{
          this.stoloviSale=res;

        });*/
        this.stoloviSale=this.sale[this.selectedSalaIndex].stolovi;
        this.predmetiSale=this.sale[this.selectedSalaIndex].predmeti;
        this.crtajSalu();
      }
    })
  }

  onKeyEvent(event: Event) {
    //console.log(event);
    if (this.editMode) {
      //console.log("zatvara se edit mode preko escape");
      this.closeEditMode();
    }
  }

  setCurrentSala() {
    if (this.selectedSalaIndex > -1)
    {
      let nizStolova: Sto[] = this.sale[this.selectedSalaIndex].stolovi.slice();
      let nizPredmeta: ObjekatSale[] = this.sale[this.selectedSalaIndex].predmeti.slice();

      this.currentSala = {
        id: this.sale[this.selectedSalaIndex].id,
        sirina: this.sale[this.selectedSalaIndex].sirina,
        duzina: this.sale[this.selectedSalaIndex].duzina,
        stolovi: nizStolova,
        predmeti: nizPredmeta
      }
    }
  }


  crtajSalu() {
    const salaDiv: HTMLDivElement = document.querySelector(".salaContainer")!;
    salaDiv.style.paddingBottom = `${this.sale[this.selectedSalaIndex].duzina / this.sale[this.selectedSalaIndex].sirina * 100}%`;

    // console.log(salaDiv.style.width);
    // console.log(salaDiv.style.paddingBottom);
  }

  getSirina(obj: Sto | ObjekatSale) {
    let sirina = obj.sirina / this.sirinaSale * 100;
    return sirina.toString() + "%";
  }

  getDuzina(obj: Sto | ObjekatSale) {
    let duzina = obj.duzina / this.duzinaSale * 100;
    return duzina.toString() + "%";
  }

  getPozicijaX(obj: Sto | ObjekatSale) {
    let pozicijaX = obj.pozicijaX / this.sirinaSale * 100;
    return pozicijaX.toString() + "%";
  }

  getPozicijaY(obj: Sto | ObjekatSale) {
    let pozicijaY = obj.pozicijaY / this.duzinaSale * 100;
    return pozicijaY.toString() + "%";
  }

  toggleEditWindow() {
    if (this.vidljivo) this.vidljivo = false;
    else this.vidljivo = true;
  }

  getDizajnStola(sto: Sto) {
    let rezervacija: Rezervacija | null = this.getRezervacija(sto, this.datum);
    let rezervisano: boolean = rezervacija ? true : false;

    let zelena = "#00FF0044";
    let crvena = "#FF000066";
    let zuta = "#FFFF0055";

    let bojaStola: string = "";

    if (rezervisano) {
      if (this.checkLogIn()) {
        if (rezervacija!.korisnik.id == this.currentKorisnik.id) {
          bojaStola = zuta;
        }
        else {
          bojaStola = crvena;
        }
      }
      else {
        bojaStola = crvena;
      }
    }
    else {
      bojaStola = zelena;
    }

    return `linear-gradient(to bottom, ${bojaStola}, ${bojaStola}), url('../../assets/planks_big_oak.png') round`;
    //return `url('../../assets/planks_big_oak.png') round`;
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

  getDizajnObjektaSale() {
    //return `linear-gradient(to bottom, ${sto.rezervisano ? '#FF000066' : '#00FF0044'}, ${sto.rezervisano ? '#FF000066' : '#00FF0044'}), url('../../assets/planks_big_oak.png') round`;
    return `url('../../assets/stonebrick.png') round`;
  }

  getFontSize(sto: Sto) {
    let velicina = sto.sirina / 1.5 * 100;
    return velicina.toString() + "%";
  }
  
  checkType(obj: Sto | ObjekatSale)
  {
    return (<Sto>obj).brojMesta!==undefined;
  }

  dodajObjekat() {
    const dialogRef = this.dialog.open(DodajObjekatDialogComponent, {
      data: {
        sala: this.sale[this.selectedSalaIndex]
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (result) {

    //   }
    // });
  }

  obrisiObjekat() {
    console.log(this.clickedObj);
    console.log(this.clickedObjDiv);
    if (this.clickedObj && this.clickedObjDiv) {
      if (this.checkType(this.clickedObj)) {
        const index = this.sale[this.selectedSalaIndex].stolovi.indexOf(this.clickedObj as Sto, 0);
        if (index > -1)
        {
          this.sale[this.selectedSalaIndex].stolovi.splice(index, 1);
        }
      }
      else {
        const index = this.sale[this.selectedSalaIndex].predmeti.indexOf(this.clickedObj as ObjekatSale, 0);
        if (index > -1)
        {
          this.sale[this.selectedSalaIndex].predmeti.splice(index, 1);
        }
      }
      this.clickedObj = null;
      this.clickedObjDiv = null;
    }
  }

  sacuvajSalu() {
    console.log(this.currentSala);
    console.log(this.sale[this.selectedSalaIndex]);

    for (let i = 0; i < this.sale[this.selectedSalaIndex].stolovi.length; i++) {
      if (this.sale[this.selectedSalaIndex].stolovi[i].id == -1) {
        console.log(this.sale[this.selectedSalaIndex].stolovi[i]);
        //console.log("dodat novi sto");
        //dodavanje stola
        this.salaService.unesiSto(this.sale[this.selectedSalaIndex].id.toString(), this.sale[this.selectedSalaIndex].stolovi[i]).subscribe(res => {
          console.log(res);
        });
      }
    }

    for (let i = 0; i < this.currentSala.stolovi.length; i++) {
      let noviSto: Sto | undefined = this.sale[this.selectedSalaIndex].stolovi.find(x => x.id == this.currentSala.stolovi[i].id)
      //console.log(noviSto);
      if (noviSto !== undefined) {
        //console.log("sto postoji i dalje");
        if (this.currentSala.stolovi[i] !== noviSto) {
          //console.log("sto je promenjen");
          //izmena stola
          this.salaService.izmeniSto(this.currentSala.stolovi[i].id.toString(), noviSto).subscribe(res => {
            console.log(res);
          });
        }
        else {
          //console.log("nema promene");
          //sto se ne menja
        }
      }
      else {
        //console.log("sto je obrisan");
        //brisanje stola
        this.salaService.obrisiSto(this.currentSala.stolovi[i].id.toString()).subscribe(res => {
          console.log(res);
        })
      }
    }



    for (let i = 0; i < this.sale[this.selectedSalaIndex].predmeti.length; i++) {
      if (this.sale[this.selectedSalaIndex].predmeti[i].id == -1) {
        console.log(this.sale[this.selectedSalaIndex].predmeti[i]);
        //console.log("dodat novi predmet");
        //dodavanje predmeta
        this.salaService.unesiPredmet(this.sale[this.selectedSalaIndex].id.toString(), this.sale[this.selectedSalaIndex].predmeti[i]).subscribe(res => {
          console.log(res);
        });
      }
    }

    for (let i = 0; i < this.currentSala.predmeti.length; i++) {
      let noviPredmet: ObjekatSale | undefined = this.sale[this.selectedSalaIndex].predmeti.find(x => x.id == this.currentSala.predmeti[i].id)
      //console.log(noviPredmet);
      if (noviPredmet !== undefined) {
        //console.log("predmet postoji i dalje");
        if (this.currentSala.predmeti[i] !== noviPredmet) {
          //console.log("predmet je promenjen");
          //izmena predmeta
          this.salaService.izmeniPredmet(this.currentSala.predmeti[i].id.toString(), noviPredmet).subscribe(res => {
            console.log(res);
          });
        }
        else {
          //console.log("nema promene");
          //predmet se ne menja
        }
      }
      else {
        //console.log("predmet je obrisan");
        //brisanje predmeta
        this.salaService.obrisiPredmet(this.currentSala.predmeti[i].id.toString()).subscribe(res => {
          console.log(res);
        })
      }
    }

    this.setCurrentSala();
  }

  selectObj(obj: Sto | ObjekatSale | null, div: HTMLDivElement) {
    setTimeout(() => {
      if (this.clickedObjDiv) this.clickedObjDiv!.style.border = "none";
      this.clickedObjDiv = div;
      if (this.editMode) div.style.border = "2px dashed lightgray";
      
      this.clickedObj = obj;
      if (this.editMode) console.log(this.clickedObj);
      if (this.editMode) console.log(this.clickedObjDiv);
    }, 150);
  }

  deselect(salaMainDiv: HTMLDivElement) {
    for (let i = 0; i < salaMainDiv.childElementCount; i++) {
      (salaMainDiv.children[i] as HTMLDivElement).style.border = "none";
    }

    this.clickedObj = null;
    this.clickedObjDiv = null;
    //console.log(this.clickedObj);
    //console.log(this.clickedObjDiv);
  }

  updateSto(sto: Sto, event: CdkDragEnd) {
    const salaDiv: HTMLDivElement = document.querySelector(".sala")!;
    
    let clientSirina = salaDiv.clientWidth;
    let clientDuzina = salaDiv.clientHeight;

    let { x, y } = event.source.getFreeDragPosition(); //uzima ofset x i y koordinata u odnosu na pocetnu poziciju stola (x i y su izrazeni u pikselima)
    //console.log('X koordinata:', x);
    //console.log('Y koordinata:', y);

    let novoX = x / clientSirina * this.sirinaSale + sto.pozicijaX;
    let novoY = y / clientDuzina * this.duzinaSale + sto.pozicijaY;
    console.log(novoX, novoY);

    let pomerenSto: Sto = {
      id: sto.id,
      naziv: sto.naziv,
      pozicijaX: novoX,
      pozicijaY: novoY,
      sirina: sto.sirina,
      duzina: sto.duzina,
      brojMesta: sto.brojMesta,
      rezervacije: sto.rezervacije
    };

    const index = this.stoloviSale.indexOf(sto, 0);
    if (index > -1) {
      this.stoloviSale[index] = pomerenSto;
    }

    //const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    //const { x, y } = event.distance;

    //console.log(offsetLeft, offsetTop);

    //this.positionX = offsetLeft + x;
    //this.positionY = offsetTop + y;
    //this.showPopup = true;
    //console.log({ positionX, positionY });
    
    //let novaPozicijaX = offsetLeft + x;
    //let novaPozicijaY = offsetTop + y;

    // stoDiv.style.position = 'absolute';
    // stoDiv.style.left = this.getPozicijaX(pomerenSto);
    // stoDiv.style.top = this.getPozicijaY(pomerenSto);

    // console.log(stoDiv.style.left, stoDiv.style.top);
  }
  updatePredmet(predmet: ObjekatSale, event: CdkDragEnd) {
    const salaDiv: HTMLDivElement = document.querySelector(".sala")!;
    
    let clientSirina = salaDiv.clientWidth;
    let clientDuzina = salaDiv.clientHeight;

    let { x, y } = event.source.getFreeDragPosition(); //uzima offset x i y koordinata u odnosu na pocetnu poziciju stola (x i y su izrazeni u pikselima)
    //console.log('X koordinata:', x);
    //console.log('Y koordinata:', y);

    let novoX = x / clientSirina * this.sirinaSale + predmet.pozicijaX;
    let novoY = y / clientDuzina * this.duzinaSale + predmet.pozicijaY;
    console.log(novoX, novoY);

    let pomerenPredmet: ObjekatSale = {
      id: predmet.id,
      naziv: predmet.naziv,
      pozicijaX: novoX,
      pozicijaY: novoY,
      sirina: predmet.sirina,
      duzina: predmet.duzina
    };

    const index = this.predmetiSale.indexOf(predmet, 0);
    if (index > -1) {
      this.predmetiSale[index] = pomerenPredmet;
    }
  }

  openRezervacijaDialog(sto: Sto) {
    if(!this.editMode)
    {
      this.clickedObj = sto;
      const dialogRef = this.dialog.open(RezervacijaDialogComponent, {
        data: {
          korisnik: this.currentKorisnik,
          sto: this.clickedObj as Sto,
          datum: this.datum,
          salaId: this.sale[this.selectedSalaIndex].id
        }
      });
    }
  }

  izmeniObjekat(obj: Sto | ObjekatSale | null)
  {
    this.clickedObj = obj;

    if(this.editMode)
    {
      const dialogRef = this.dialog.open(EditObjDialogComponent, {
        data: {
          obj: this.clickedObj,
          sirinaSale: this.sirinaSale,
          duzinaSale: this.duzinaSale
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);

        if (result)
        {
          console.log(result);

          if (result.id != -1) {
            if (this.checkType(result)) {
              //console.log("Sto");
              const index = this.stoloviSale.indexOf(result as Sto, 0);
              this.salaService.izmeniSto(this.currentSala.stolovi[index].id.toString(), result as Sto).subscribe(res => {
                console.log(res);
              });
            }
            else
            {
              //console.log("Predmet");
              const index = this.predmetiSale.indexOf(result as ObjekatSale, 0);
              this.salaService.izmeniPredmet(this.currentSala.predmeti[index].id.toString(), result as ObjekatSale).subscribe(res => {
                console.log(res);
              });
            }
          }
        }
      });
    }
  }

  
  openSalaDialog() {
    if(this.editMode)
    {
      const dialogRef = this.dialog.open(DodajSaluDialogComponent, {
        data: {
          restoran: this.restoran
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result) {
          if (this.selectedSalaIndex > -1) {
            this.sacuvajSalu();
          }
          this.selectedSalaIndex = this.restoran.sale.length - 1;
          this.sale = this.restoran.sale;
          this.duzinaSale = this.sale[this.selectedSalaIndex].duzina; //u metrima
          this.sirinaSale = this.sale[this.selectedSalaIndex].sirina; //u metrima
          this.stoloviSale = this.sale[this.selectedSalaIndex].stolovi;
          this.predmetiSale = this.sale[this.selectedSalaIndex].predmeti;
          this.crtajSalu();
          this.setCurrentSala();
        }
      });
    }
  }

}
