import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { Jela } from '../../models/Jela';
import { MeniService } from '../../services/meni.service';
import { MatDialog } from '@angular/material/dialog';
import { HranaInfoComponent } from '../hrana-info/hrana-info.component';
import { Korisnik } from '../../models/Korisnik';

@Component({
  selector: 'app-preporucena-jela',
  templateUrl: './preporucena-jela.component.html',
  styleUrls: ['./preporucena-jela.component.scss']
})
export class PreporucenaJelaComponent implements OnInit {

  @Input() res!: Restoran;
  @Input() curUser!: Korisnik;
  public preporucenaJela: Jela[] = [];
  
  constructor(private service: MeniService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.updatePreporucena(this.res.id.toString());
    this.service.preporucenaJela$.subscribe((res) => {
      this.preporucenaJela = res;
    });


  }

  openInfoDialog(h: Jela)
  {
    const dialogRef = this.dialog.open(HranaInfoComponent, {
      data: {
        hrana: h,
        currentUser: this.curUser,
        restoran: this.res
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
