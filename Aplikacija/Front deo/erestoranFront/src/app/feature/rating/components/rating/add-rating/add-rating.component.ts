import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Jela } from 'src/app/feature/restaurants/models/Jela';
import { Korisnik } from 'src/app/feature/restaurants/models/Korisnik';
import { Restoran } from 'src/app/feature/restaurants/models/Restoran';
import { MeniService } from 'src/app/feature/restaurants/services/meni.service';
import { OcenaService } from 'src/app/feature/restaurants/services/ocena.service';
import { RestoranService } from 'src/app/feature/restaurants/services/restoran.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit{

  maxRating=5;
  maxRatingArr:any=[];
  public selectedStar:number=0;
  public prevSelection:number=0;
  @Input() currUser!: Korisnik;
  @Input() res!: Restoran;
  @Input() indikator!: boolean;
  @Input() hrana!: Jela;

  @Input() prosecnaOcenaHrane!: number;

  public btnPrikaz: boolean = true;
  public addOcena: boolean = false;

  constructor(private service: RestoranService, private route: ActivatedRoute, private oService: OcenaService, private userService: UserService, private auth: AuthService, private meniService: MeniService, private toast: NgToastService) { }


  ngOnInit(): void {

    //console.log(this.indikator);
    if(this.indikator)
    {
      this.btnPrikaz=false;
      this.oService.postaviProsecnuHrana(this.prosecnaOcenaHrane);
    }
    //console.log(this.hrana);
    this.maxRatingArr=Array(this.maxRating).fill(0);

  }

  isCurUser()
  {
    return this.userService.checkLogIn(this.currUser);
  }

  HandleMouseEnter(index: number)
  {
    this.selectedStar=index+1;
  }
  

  HandleMouseLeave()
  {
    if(this.prevSelection!==0)
    {
      this.selectedStar=this.prevSelection;
    }
    else
    {
      this.selectedStar=0;
    }
  }

  openDajOcenuFormu()
  {
    this.addOcena=true;
  }
  closeDajOcenuFormu()
  {
    this.addOcena=false;
  }

  Rating(index:number)
  {
    if(this.isCurUser())
    {
      if(this.hrana)
      {
        //console.log(this.hrana);
        //console.log(this.res);

        let ocenaHrane=this.hrana.ocene.find(o=>o.korisnik.id===this.currUser.id);
        //console.log(ocenaHrane);

        if(ocenaHrane===undefined)
        {
          this.selectedStar=index+1;
          this.prevSelection=this.selectedStar;
          //console.log(this.selectedStar);
          this.oService.dajOcenuHrani(this.hrana.id.toString(), this.currUser.id.toString(), this.selectedStar).subscribe((res)=>{
            //console.log(res);
            this.meniService.updateJelo(this.hrana.id.toString());
            //this.meniService.updateMeni(this.res.id.toString());
            this.meniService.updatePreporucena(this.res.id.toString());
            //console.log(this.hrana)
            this.oService.updateProsecnuOcenuHrane(this.hrana.id.toString());
            this.indikator=false;
          })
        }
        else
        {
          this.toast.error({detail: "GREŠKA", summary: "Već ste dali ocenu ovoj hrani", duration: 5000});
          this.indikator=false;
        }
      }
      else
      {
        let ocenaRes = this.res.ocene.find(o=>o.korisnik.id===this.currUser.id);
        if(ocenaRes===undefined)
        {
          this.selectedStar=index+1;
          this.prevSelection=this.selectedStar;
          this.oService.dajOcenuRestoranu(this.res.id.toString(), this.currUser.id.toString(), this.selectedStar).subscribe((res)=>{
            //console.log(res);
            this.oService.updateProsecnuOcenu(this.res.id.toString());
            this.addOcena=false;
          }, err => {
            this.toast.error({detail: "GREŠKA", summary: "Već ste dali ocenu ovom restoranu", duration: 5000});
            this.addOcena=false;
          });
        }
        else
        {
          this.toast.error({detail: "GREŠKA", summary: "Već ste dali ocenu ovom restoranu", duration: 5000});
          this.addOcena=false;
        }
      }
      
      
    }
    
  }
}
