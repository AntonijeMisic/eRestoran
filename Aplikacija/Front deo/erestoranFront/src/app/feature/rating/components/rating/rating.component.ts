import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Jela } from 'src/app/feature/restaurants/models/Jela';
import { Restoran } from 'src/app/feature/restaurants/models/Restoran';
import { OcenaService } from 'src/app/feature/restaurants/services/ocena.service';
import { RestoranService } from 'src/app/feature/restaurants/services/restoran.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  maxRating=5;
  maxRatingArr: HTMLElement[] =[];
  public selectedStar:number=0;
  public prevSelection:number=0;

  @Input() res!: Restoran;
  @Input() hrana!: Jela;

  public prosecnaOcenaRes: number = -1;
  public prosecnaOcenaHrane: number = -1;

  constructor(private service: RestoranService, private oService: OcenaService){}


  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['res'] && changes['res'].currentValue)
  //   {
  //     this.oService.getProsecnaOcenaRestorana(this.res.id.toString()).subscribe((o)=>{
  //       this.oService.postaviProsecnu(o);
  //       this.oService.prosecnaRes$.subscribe((res)=>{
  //         this.prosecnaOcenaRes=res;
  //       });
  //     });

  //     this.oService.updateProsecnuOcenu(this.res.id.toString());
  //   }
  // }

  ngOnInit(): void {

    //console.log(this.AvgOcenajelo);
    if (this.hrana == undefined) {
      if (this.prosecnaOcenaRes == -1) {
        this.oService.getProsecnaOcenaRestorana(this.res.id.toString()).subscribe((o)=>{
          this.oService.postaviProsecnu(o);
          this.oService.prosecnaRes$.subscribe((res)=>{
            this.prosecnaOcenaRes=res;
          });
        });
      }
    }
    else {
      if (this.prosecnaOcenaHrane == -1) {
        this.oService.updateProsecnuOcenuHrane(this.hrana.id.toString());
        this.oService.prosecnaHrana$.subscribe(res => {
          //console.log(res);
          this.prosecnaOcenaHrane = res;
        });
      }
    }

    this.maxRatingArr = Array(5).fill(0);
    
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
  Rating(index:number)
  {
    //console.log(index);
    this.selectedStar=index+1;
    this.prevSelection=this.selectedStar;
  }

}
