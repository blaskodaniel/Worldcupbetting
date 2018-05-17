import { DataService } from '../_services/data.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Team } from '../_models/team.model';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  teams:Team[];
  
  constructor(private dataService:DataService, private route: Router,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    this.GetTeams();
    this.registrationForm = new FormGroup({
      'username':new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null, Validators.required),
      'passwordre': new FormControl(null, Validators.required),
      'teamid':new FormControl(null,Validators.required)
    });
  }

  onSubmit(){
    console.log(this.registrationForm);
    this.dataService.register(this.registrationForm.value).subscribe(
      (response)=>{
        this.toastr.success('Sikeres regisztráció!', 'Siker!');
      },
      (error)=>console.log(error)
    );
  }

  GetTeams(){
    this.dataService.getTeams().subscribe(
      (response)=>{
        console.log(response);
        this.teams = JSON.parse(response["_body"]);
      },
      (error)=>console.log(error)
    )
  }

  // Custom validator: Validators.checkPasswords.bind(this)
  checkPasswords(control:FormControl):{[s:string]:boolean}{
    if(control.value != "barack"){
      // nem egyenlő a két password
      return {'passwordsIsSame':false}
    }else{
      // egyenlő a két password
      return null;
    }
  }

}
