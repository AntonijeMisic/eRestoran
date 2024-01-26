import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { Komentar } from '../../models/Komentar';
import { Korisnik } from '../../models/Korisnik';
import { KomentariService } from '../../services/komentari.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KomentarEditComponent } from '../komentar-edit/komentar-edit.component';
import { PotvrdaDialogComponent } from '../potvrda-dialog/potvrda-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-komentari',
  templateUrl: './komentari.component.html',
  styleUrls: ['./komentari.component.scss']
})
export class KomentariComponent implements OnInit{

  @Input() res!: Restoran
  @Input() curUser!: Korisnik;
  public clicked: boolean = false;
  public tekst!: string;
  public noviKomentar!: Komentar;
  public btnEnabled: boolean = false;
  komentari: Komentar[]= [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private commentsService: KomentariService, private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {

    //console.log(this.komentari);
    this.commentsService.komentariRes$.subscribe((kom)=>{
      this.komentari=kom;
    });

    this.commentsService.updateKomentari(this.res.id.toString());

  }

  checkLogIn() {
    return this.userService.checkLogIn(this.curUser);
  }

  checkUserAdmin() {
    return this.userService.checkUserAdmin(this.curUser);
  }

  checkCommentOwner(kom: Komentar) {
    if (this.curUser != undefined) {
      if (kom.korisnik.id == this.curUser.id) {
        return true;
      }
    }
    return false;
  }

  AddComment()
  {
    this.clicked=true;
  }
  CancelComment()
  {
    this.clicked=false;
  }
  SaveComment(kom: string)
  {
      this.commentsService.dodajKomentarRestoranu(this.res.id.toString(), this.curUser.id.toString(), kom).subscribe(
        (res:Komentar)=>{
          this.noviKomentar=res;
          //this.komentari.push(this.noviKomentar);
          this.commentsService.updateKomentari(this.res.id.toString());
        }
      );

      this.clicked=false;
    
  }
  checkTextbox(kom: string)
  {
    if (kom.length != 0)
      this.btnEnabled = true;
    else
      this.btnEnabled = false;
  }

  prikaziVreme(date: Date):string
  {
    return this.commentsService.prikaziVreme(date);
  }

  openEditKomentarDialog(kom: Komentar)
  {
    if(this.curUser!==null && kom!==null)
    {
      const responseDialogRef = this.dialog.open(KomentarEditComponent, {
        data: {
          korisnik: this.curUser,
          komentar: kom,
          restoran: this.res
        }
      });
    }
  }
  
  openDeleteKomentarDialog(kom: Komentar)
  {
    //klikom na dugme delete ja prvo zovem potvrda dialog i kad klikne yes ja zovem funk iz servisa koji brise ovaj preneti komentar i na afterclosed radim update komentara za ovaj res
    const dialogRef = this.dialog.open(PotvrdaDialogComponent, {
      data: {
        tip: "Komentar",
        komentar: kom
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result=="Komentar") {
        this.commentsService.obrisiKomentarRestorana(this.res.id.toString(), this.curUser.id.toString(), kom.id.toString()).subscribe(
          (resource)=>{
            this.noviKomentar=resource;
            this.commentsService.updateKomentari(this.res.id.toString());
          }
        );
      }
    });
  }
}
