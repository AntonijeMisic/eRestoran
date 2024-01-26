import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Jela } from '../../models/Jela';
import { Korisnik } from '../../models/Korisnik';
import { UserService } from 'src/app/shared/services/user.service';
import { MeniService } from '../../services/meni.service';
import { Restoran } from '../../models/Restoran';

@Component({
  selector: 'app-hrana-info',
  templateUrl: './hrana-info.component.html',
  styleUrls: ['./hrana-info.component.scss']
})
export class HranaInfoComponent implements OnInit {

  public hrana!: Jela;
  public currUser!: Korisnik;
  public res!: Restoran;
  public addOcena:boolean=false;
  public prosecnaOcena: number = -1;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private meniService: MeniService) { }

  ngOnInit(): void {
    this.res = this.data.restoran;

    this.meniService.getHranaFromRestoran(this.data.hrana.id.toString()).subscribe(
      (res)=>{
        this.meniService.postaviHranu(res);
        this.meniService.jeloRes$.subscribe((j)=>{
          this.hrana=j;
          this.currUser=this.data.currentUser;
          if (this.prosecnaOcena == -1) this.ProsecnaOcenaJela(this.hrana);
        })
      }
    );
    //this.meniService.updateJelo(this.hrana.id.toString());
  }
  openDajOcenuFormu()
  {
    this.addOcena=true;
  }
  closeDajOcenuFormu()
  {
    this.addOcena=false;
  }

  isCurrentUserAdmin()
  {
    return this.userService.checkUserAdmin(this.currUser);
  }
  ProsecnaOcenaJela(j: Jela)
  {
    this.meniService.getAvgOcenaJela(j.id.toString()).subscribe(
      (avg)=>{
        this.prosecnaOcena=avg;
        //console.log(avg);
      }
    );
  }

  
}
