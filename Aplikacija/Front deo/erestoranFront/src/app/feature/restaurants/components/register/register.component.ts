import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import ValidateForm from '../../services/validateForm';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public ime:string="";
  public prezime:string="";
  public username: string= "";
  public email: string="";
  public telefon: string="";
  public password: string= "";
  public repPassword: string= "";
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private toast: NgToastService, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      ime:['', Validators.required],
      prezime:['', Validators.required],
      email:['', Validators.required],
      telefon:['', Validators.required],
      username: ['', Validators.required ],
      password: ['', Validators.required],
      repPassword:['', Validators.required]
  });
  }

  public onRegister()
  {
    if(this.registerForm.valid) //kada registrujemo korisnika mi moramo da saljemo te podatke backendu koji ce da registruje korisnika u bazu
    {
      if(this.password===this.repPassword)
      {
          this.authService.signUp(this.registerForm.value).subscribe(
            {
              next: (res)=>{
                this.toast.success({detail: "USPESNO", summary: "Uspesno ste napravili nalog", duration: 5000});
                 this.router.navigate(['/signup']);

              },
              error: (err)=>{
                this.toast.error({detail: "GRESKA", summary: "Neki od podataka nisu validni", duration: 5000});
                this.registerForm.reset();
              }
            }
          );
          this.toast.success({detail: "USPESNO", summary: "Uspesno ste napravili nalog", duration: 5000});
      }
      else
      {
        this.toast.error({detail: "GRESKA", summary: "Lozinke se ne podudaraju", duration: 5000});
        //pocrveniii sveeee
        this.registerForm.reset();
      }
    }
    else
    {
      ValidateForm.validateAllFormFields(this.registerForm);
    }
    
  }

  
}
