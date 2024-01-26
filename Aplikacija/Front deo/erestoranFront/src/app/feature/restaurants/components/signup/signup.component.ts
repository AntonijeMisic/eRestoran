import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../services/validateForm';
import { Router } from '@angular/router';
import {  NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  public username = "";
  public password = "";
  loginForm!: FormGroup;
  user!: any;

  constructor(private fb: FormBuilder, private router: Router, private toast: NgToastService, private authService: AuthService, private userService: UserService) {
    
  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    });

    

  }

  public onLogin() {

    if(this.loginForm.valid)
    {
      this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.storeToken(res.accessToken);
        this.authService.storeUserIdFromToken(); //cuva userid u localstorage
        this.loginForm.reset();
        this.router.navigateByUrl('/home', {skipLocationChange:false}).then(()=>{this.router.navigate(['/home']); location.reload()});

      },
      error: (err)=>{
        this.toast.error({detail: "GREŠKA", summary: "Pogrešno korisničko ime i/ili lozinka", duration: 5000});
        this.loginForm.reset();
      }
    });
    }
    else
    {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

}
