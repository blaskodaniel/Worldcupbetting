import { AuthService } from '../_services/auth.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = "blaskoi@gmail.com";
  public password:string = "bastya";
  loginForm: FormGroup;
  token:string;

  constructor(private serverService:DataService,
    private authservice: AuthService,
    private router: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
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
        console.log("Login válasz:",data);
        if(data["success"]){
          console.log("Login successfuly");
          this.router.navigate(['/home']);
        }else{
          if(data["code"] == 1){
            this.toastr.error('Login failed! Not valid email or password', 'Error!');
            console.log("Login failed! Not valid email or password");
          }
          if(data["code"] == 2){
            this.toastr.error('Login failed!', 'Error!');
            console.log("Login failed!");
          }
          
        }
        
      });
  }

}
