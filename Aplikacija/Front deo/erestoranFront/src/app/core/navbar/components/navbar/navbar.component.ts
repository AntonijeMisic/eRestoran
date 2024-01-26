import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Korisnik } from 'src/app/feature/restaurants/models/Korisnik';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public currentUser!:Korisnik;

  constructor(private userService: UserService, private router: Router, private auth: AuthService){}
  ngOnInit(): void {
    let id: string | null = this.auth.getUserIdFromStorage();

    if(id !== null)
    {
      this.userService.getUserById(id).subscribe(
        (res)=>{
          this.currentUser=res;
        }
      );
    }
  }

  logout()
  {
    
    this.userService.odjavi();
    this.router.navigateByUrl('/home', {skipLocationChange:false}).then(()=>{this.router.navigate(['/home']); location.reload()});

  }


  gotoUserPage()
  {
    if(this.currentUser)
    {
      this.router.navigate(["/user"]);
    }
  }
}

