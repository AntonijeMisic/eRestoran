import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Komentar } from '../../models/Komentar';
import { Jela } from '../../models/Jela';
import { RestoranService } from '../../services/restoran.service';
import { Korisnik } from '../../models/Korisnik';
import { PotvrdaDialogComponent } from '../potvrda-dialog/potvrda-dialog.component';
import { KomentariService } from '../../services/komentari.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-hrana-komentari',
  templateUrl: './hrana-komentari.component.html',
  styleUrls: ['./hrana-komentari.component.scss']
})
export class HranaKomentariComponent implements OnInit{

  public komentari: Komentar[] = [];
  public currentUser!: Korisnik;
  public clickedKomentar!: Komentar;
  public jelo!: Jela;
  public noviKomentar!: Komentar;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private commService: KomentariService, private userService: UserService) { }

  ngOnInit(): void {
    this.UcitajKomentare(this.data.hrana);
    this.currentUser=this.data.korisnik;
  }

  checkLogIn() {
    return this.userService.checkLogIn(this.currentUser);
  }

  checkUserAdmin() {
    return this.userService.checkUserAdmin(this.currentUser);
  }

  checkCommentOwner(kom: Komentar) {
    if (this.currentUser != undefined) {
      if (kom.korisnik.id == this.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  UcitajKomentare(j: Jela)
  {
    this.jelo=j;
    this.commService.komentariHrane$.subscribe((kom)=>{
      this.komentari=kom;
    });

    this.commService.updateKomentareHrane(j.id.toString());
  }
  prikaziVreme(date: Date):string
  {
    return this.commService.prikaziVreme(date);
  }

  obrisiKomentar(kom: Komentar) {
    this.clickedKomentar = kom;
    //console.log(this.clickedKomentar);
    const dialogRef = this.dialog.open(PotvrdaDialogComponent, {
      data: {
        tip: "Komentar"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result=="Komentar") {
        this.commService.obrisiKomentarHrane(this.data.hrana.id.toString(), this.currentUser.id.toString(), this.clickedKomentar.id.toString()).subscribe(
          (resource)=>{
            this.noviKomentar=resource;
            this.commService.updateKomentareHrane(this.data.hrana.id.toString());
          }
        );
      }
    });
  }
  

}
