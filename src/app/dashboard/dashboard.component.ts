import { contenteditableDirective } from '../_directives/contenteditable.directive';
import { DataService } from '../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  teams:any;
  teamsearch:string;
  teamOrderKey:string = 'name';
  teamOrderReverse:boolean = false;

  users:any;
  userSearch:string;
  userOrderKey: string = 'regdate';
  userOrderReverse: boolean = true;

  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getusers();
    this.getteams();
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

  getteams(){
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
    console.log(user);
    this.dataservice.deleteUser(user).subscribe(
      (x)=>{
        this.toastr.success('Sikeres Törlés!', 'Üzenet');
        this.getusers();
      }
    )
  }

  EditTeam(team){
    console.log(team);
    this.dataservice.updateTeam(team).subscribe(
      (x)=>{
        this.toastr.success('Sikeres mentés!', 'Üzenet',{positionClass:"toast-bottom-left"});
      }
    )
  }

  DeleteTeam(team){
    console.log(team);
    this.dataservice.deleteTeam(team).subscribe(
      (x)=>{
        this.toastr.success('Sikeres Törlés!', 'Üzenet');
        this.getusers();
      }
    )
  }

}
