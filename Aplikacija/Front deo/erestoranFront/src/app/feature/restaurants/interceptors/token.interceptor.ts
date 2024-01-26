import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken=this.auth.getToken();

    if(myToken)
    {
      request=request.clone({
        setHeaders:{Authorization: `Bearer ${myToken}`}
      })
    }

    return next.handle(request).pipe(
      catchError((err: any)=>{
        if(err instanceof HttpErrorResponse)
        {
          if(err.status===401){
            this.toast.warning({detail: "Warning", summary:"Token je istekao, molimo vas ulogujte se ponovo"});
            this.router.navigate(['/signup']);
          }
        }
        return throwError(()=>new Error("Neki drugi error se desio"));
      })
    );

  }
}
