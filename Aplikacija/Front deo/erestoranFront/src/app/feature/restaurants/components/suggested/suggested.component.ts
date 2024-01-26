import { Component, OnInit } from '@angular/core';
import { Restoran } from '../../models/Restoran';
import { RestoranService } from '../../services/restoran.service';
import { OcenaService } from '../../services/ocena.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {
  public preporuceni: Restoran[] = [];

  constructor(private service: RestoranService) { }

  ngOnInit(): void {

    this.service.getPreporuceniRestorani().subscribe(newRes=> {
      this.preporuceni = newRes;
      //console.log(this.preporuceni);
    }); 
  }
}
