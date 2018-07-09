import { AuthService } from '../_services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = "";
  public password:string = "";
  loginForm: FormGroup;
  token:string;
  isLogin: false;

  constructor(private serverService:DataService,
    private authservice: AuthService,
    private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    if(this.authservice.isAuthenticated()){
      this.router.navigate(['/home']);
    }
    this.loginForm = new FormGroup({
      'email':new FormControl(null, Validators.email),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.serverService.login(this.email,this.password).subscribe(
      (data)=>{
        console.log("Szerver válasz:",data);
        this.router.navigate(['/home']);
      },
      (error)=>{
        this.toastr.error('Not valid email or password', 'Login failed!');
      }
    );
  }

}
