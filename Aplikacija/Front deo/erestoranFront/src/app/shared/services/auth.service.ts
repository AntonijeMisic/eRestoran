import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { url } from 'environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userPayload!:any;
  constructor(private http: HttpClient) { 

    
  }

  signUp(userObj: any)
  {
    return this.http.post<any>(`${url}/Korisnik/Registracija`, userObj);
  }
  login(loginObj: any)
  {
    return this.http.post<any>(`${url}/Korisnik/Autentikacija`, loginObj);
  }
  storeToken(tokenValue: string)
  {
    localStorage.setItem("token", tokenValue);
  }
  getToken()
  {
    return localStorage.getItem("token");
  }
  isLoggedIn(): boolean
  {
    return !!localStorage.getItem("token"); //dva uzvicnika bukvalno kazu da ako nije null vrati true a ako jeste false
  }

  storeUserIdFromToken()
  {
    let jwtHelper=new JwtHelperService();
    let token=this.getToken()!;
    this.userPayload=jwtHelper.decodeToken(token);
    if(this.userPayload)
    {
      localStorage.setItem("id", this.userPayload.certserialnumber);
    }
  }
  getUserIdFromStorage()
  {
    return localStorage.getItem("id");
  }
}
