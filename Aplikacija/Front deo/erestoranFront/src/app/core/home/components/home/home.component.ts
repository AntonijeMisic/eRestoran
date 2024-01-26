import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { Korisnik } from 'src/app/feature/restaurants/models/Korisnik';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userId!: number;
  private routeSub:Subscription| undefined;
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    
    
  }
}
