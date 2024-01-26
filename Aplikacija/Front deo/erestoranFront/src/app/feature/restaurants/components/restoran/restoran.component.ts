import { Component, OnInit } from '@angular/core';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Korisnik } from '../../models/Korisnik';
import { EditRestoranDijalogComponent } from '../edit-restoran-dijalog/edit-restoran-dijalog.component';
import { MatDialog } from '@angular/material/dialog';
import { PotvrdaDialogComponent } from '../potvrda-dialog/potvrda-dialog.component';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.scss']
})
export class RestoranComponent implements OnInit{

  public restorani: Restoran[] = [];
  public curUser!: Korisnik;
  constructor(private auth: AuthService, private service: RestoranService, private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog) {}


  ngOnInit(): void {

    let id: string | null = this.auth.getUserIdFromStorage();
    if(id !== null)
    {
      this.userService.getUserById(id).subscribe(
        (res)=>{
          this.curUser=res;     
        }
      );
    }

    this.route.params.subscribe(
      params=>{
        if(params['searchTerm']) //ako uopste imamo parametar 
        {
          this.service.updateRestorani();

          this.service.restorani$.subscribe(newRes => {
            this.restorani=newRes.filter(res=> res.naziv.toLowerCase().includes(params['searchTerm'].toLowerCase()));
          });

          //ovde je tok podataka koji nam vraca getAll filtriran tako da prikazuje hranu koja u sebi sadrzi taj searchTerm
        }
        else
        {
          // this.service.getAll().subscribe((res => {
          //   console.log(res)
          // }))

          this.service.updateRestorani();
          
          this.service.restorani$.subscribe(newRes => {
            this.restorani = newRes;
          });

        }
      }
    );
  }

  checkUserAdmin()
  {
    return this.userService.checkUserAdmin(this.curUser);
  }

  izmeniRestoran(r: Restoran)
  {
    if(this.curUser!==null && r!==null)
    {
      const responseDialogRef = this.dialog.open(EditRestoranDijalogComponent, {
        data: {
          tip: "Izmeni",
          korisnik: this.curUser,
          restoran: r
        }
      });
      responseDialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result ) 
        {
          this.service.updateRestorani();
        }
      });
    }
  }

  obrisiRestoran(r: Restoran)
  {
    if(this.curUser!==null && r!==null)
    {
      const responseDialogRef = this.dialog.open(PotvrdaDialogComponent, {
        data: {
          tip: "Restoran"
        }
      });
      responseDialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result=="Restoran") 
        {
          this.service.obrisiRestoran(r.id.toString()).subscribe((res)=>{
            console.log(res);
            this.service.updateRestorani();
          })
        }
      });
    }
  }
  
  dodajRestoran()
  {
    if(this.curUser!=null)
    {
      const dialogRef = this.dialog.open(EditRestoranDijalogComponent, {
        data: {
          tip: "Dodaj",
          korisnik: this.curUser
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result ) 
        {
          this.service.updateRestorani();
        }
      });
    }
  }
}
