import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { ActivatedRoute } from '@angular/router';
import { Jela } from '../../models/Jela';
import { Komentar } from '../../models/Komentar';
import { MatDialog } from '@angular/material/dialog';
import { HranaInfoComponent } from '../hrana-info/hrana-info.component';
import { HranaKomentariComponent } from '../hrana-komentari/hrana-komentari.component';
import { AddHranaKomComponent } from '../add-hrana-kom/add-hrana-kom.component';
import { Korisnik } from '../../models/Korisnik';
import { UserService } from 'src/app/shared/services/user.service';
import { KomentariService } from '../../services/komentari.service';
import { MeniService } from '../../services/meni.service';
import { EditJeloDialogComponent } from '../edit-jelo-dialog/edit-jelo-dialog.component';
import { PotvrdaDialogComponent } from '../potvrda-dialog/potvrda-dialog.component';
import { catchError, delay, flatMap, of, switchMap, take, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.scss']
})
export class MeniComponent implements OnInit{

  @Input() res!: Restoran;
  @Input() curUser!:Korisnik;
  public clicked:boolean=false;
  public AddClicked:boolean=false;
  jela: Jela[] = [];
  public clickedJelo!: Jela;
  public komentariJela: Komentar[]=[];
  constructor(private meniService: MeniService, public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    
    this.meniService.updateMeni(this.res.id.toString());
    this.meniService.meniRes$.subscribe((res) => {
      this.jela = res;
    });
    
    //this.meniService.updateMeni(this.res.id.toString());
  }

  checkUserAdmin()
  {
    return this.userService.checkUserAdmin(this.curUser);
  }

  openInfoDialog(h: Jela)
  {
    this.clickedJelo = h;
    const dialogRef = this.dialog.open(HranaInfoComponent, {
      data: {
        hrana: this.clickedJelo,
        currentUser: this.curUser,
        restoran: this.res
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  openKomentariDialog(h: Jela) {
    this.clickedJelo = h;
    const dialogRef = this.dialog.open(HranaKomentariComponent, {
      data: {
        hrana: this.clickedJelo,
        korisnik: this.curUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);

        if (result) {
          let kom: Komentar | null;
          if (typeof result !== "boolean") {
            kom = result;
          }
          else {
            kom = null;
          }
          const responseDialogRef = this.dialog.open(AddHranaKomComponent, {
            data: {
              hrana: this.clickedJelo,
              korisnik: this.curUser,
              komentar: kom
            }
          });
          responseDialogRef.afterClosed().subscribe(result => {
            //console.log(`Response dialog result: ${result}`);
            if (result) {
              this.openKomentariDialog(h);
            }
          });
      }
    });
  }

  izmeniJelo(hrana: Jela)
  {
    if(this.curUser!==null && hrana!==null)
    {
      const dialogRef = this.dialog.open(EditJeloDialogComponent, {
        data: {
          tip: "Izmeni",
          korisnik: this.curUser,
          jelo: hrana
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
        if (result ) 
        {
          this.meniService.updateMeni(this.res.id.toString());
          this.meniService.updatePreporucena(this.res.id.toString());
        }
      });
    }
  }

  obrisiJelo(hrana: Jela)
  {
    //zovi api za brisanje jela
    if(this.curUser!==null && hrana!==null)
    {
      const dialogRef = this.dialog.open(PotvrdaDialogComponent, {
        data: {
          tip: "Jelo"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
        if (result =="Jelo") {
          this.meniService.obrisiJelo(hrana.id.toString(), this.curUser.id.toString()).subscribe(
            (resource)=>{
              this.meniService.updateMeni(this.res.id.toString());
              this.meniService.updatePreporucena(this.res.id.toString());
            }
          );
        }
      });
    }
  }

  DodajJelo(){

    if(this.curUser!=null)
    {
      const dialogRef = this.dialog.open(EditJeloDialogComponent, {
        data: {
          tip: "Dodaj",
          restoran: this.res,
          korisnik: this.curUser
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
        if (result ) 
        {
          this.meniService.updateMeni(this.res.id.toString());
        }
      });
    }
  }


}
