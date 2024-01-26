import { Component, OnInit } from '@angular/core';
import { RestoranService } from '../../services/restoran.service';
import { Restoran } from '../../models/Restoran';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Korisnik } from '../../models/Korisnik';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EditRestoranDijalogComponent } from '../edit-restoran-dijalog/edit-restoran-dijalog.component';
import { MatDialog } from '@angular/material/dialog';
import { OcenaService } from '../../services/ocena.service';

@Component({
  selector: 'app-restoran-page',
  templateUrl: './restoran-page.component.html',
  styleUrls: ['./restoran-page.component.scss']
})
export class RestoranPageComponent implements OnInit {

  public currentKorisnik!:Korisnik;
  public restoran!: Restoran;

  public avgOcena!: number;

  constructor(private service: RestoranService, private route: ActivatedRoute, private userService: UserService, private auth: AuthService, private router: Router, private dialog: MatDialog, private oService: OcenaService) { }

  ngOnInit(): void {

    let id: string | null = this.auth.getUserIdFromStorage();
    if(id !== null)
    {
      this.userService.getUserById(id).subscribe((res) => {
        this.currentKorisnik = res
      });
    }

    this.route.params.subscribe(
      params=>{
        if(params['id'])
        {
          let id=params['id'];
          this.service.getRestoranById(id).subscribe((res)=>{
            this.restoran=res;
            //console.log(res);
            this.oService.getProsecnaOcenaRestorana(this.restoran.id.toString()).subscribe((o)=>{
              this.avgOcena = o;
            })
          });

          //this.service.updateRestoran(this.restoran.id.toString());
          //this.oService.updateProsecnuOcenu(this.restoran.id.toString());
        }
      }
    );
  }

  isCurUserAdmin()
  {
    return this.userService.checkUserAdmin(this.currentKorisnik);
  }

  getPozadina() {
    return `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url(${this.restoran.slika})`
  }

  otvoriSalu()
  {
    this.router.navigate([`/sala/${this.restoran.id}`]);
  }

  izmeniRestoran()
  {
    if(this.currentKorisnik!==null && this.restoran!==null)
    {
      const responseDialogRef = this.dialog.open(EditRestoranDijalogComponent, {
        data: {
          tip: "Izmeni",
          korisnik: this.currentKorisnik,
          restoran: this.restoran
        }
      });
      responseDialogRef.afterClosed().subscribe(result => {
        //console.log(`Dialog result: ${result}`);
        if (result) 
        {
          this.service.updateRestoran(this.restoran.id.toString());
        }
      });
    }
  }


}
