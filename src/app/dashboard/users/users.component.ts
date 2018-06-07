import { FormControl, FormGroup, Validators } from '@angular/forms';
import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  teams:any;
  userSearch:string;
  userOrderKey: string = 'regdate';
  userOrderReverse: boolean = true;
  addNewUserForm:FormGroup;

  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getusers();
    this.getTeams();
    this.addNewUserForm = new FormGroup({
      'name': new FormControl(null),
      'username': new FormControl(null, Validators.required),
      'email':new FormControl(null,Validators.required),
      'password':new FormControl(null,Validators.required),
      'teamid': new FormControl(null),
      'role': new FormControl(null),
      'avatar': new FormControl(null),
    });
  }

  addNewUser(){
    this.dataservice.addUser(this.addNewUserForm.value).subscribe(
      response => {
        console.log("Create user successfuly!");
        this.getusers();
      }
    )
  }

  getusers(){
    this.dataservice.getUsers().subscribe(
      (response)=>{
        console.log(response);
        this.users = response;
      },
      (error)=>console.log(error)
    )
  }

  getTeams(){
    this.dataservice.getTeams().subscribe(
      (response)=>{
        console.log(response);
        this.teams = JSON.parse(response["_body"]);
      },
      (error)=>console.log(error)
    )
  }

  EditUser(user){
    console.log(user);
    this.dataservice.updateUser(user).subscribe(
      (x)=>{
        this.toastr.success('Sikeres mentés!', 'Üzenet',{positionClass:"toast-bottom-left"});
      }
    )
  }

  DeleteUser(user){
    if(window.confirm("Biztosan törlöd a felhasználót?")){
      console.log(user);
      this.dataservice.deleteUser(user).subscribe(
        (x)=>{
          this.toastr.success('Sikeres Törlés!', 'Üzenet');
          this.getusers();
        }
      )
    }
    
  }

}
