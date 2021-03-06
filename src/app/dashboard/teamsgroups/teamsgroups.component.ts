import { FormControl, Validators } from '@angular/forms';
import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-teamsgroups',
  templateUrl: './teamsgroups.component.html',
  styleUrls: ['./teamsgroups.component.css']
})
export class TeamsgroupsComponent implements OnInit {
  teams:any;
  groups:any;
  teamsearch:string;
  teamOrderKey:string = 'name';
  teamOrderReverse:boolean = false;
  // FromGroups:
  addNewGroupForm:FormGroup;
  addNewTeamForm:FormGroup;
  
  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getteams();
    this.getgroups();
    this.addNewGroupForm = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });
    this.addNewTeamForm = new FormGroup({
      'groupid': new FormControl(null,Validators.required),
      'name': new FormControl(null, Validators.required),
      'winteamid': new FormControl(null),
      'flag':new FormControl(null,Validators.required)
    });
    
  }

  addNewGroup(){
    console.log("Group: "+JSON.stringify(this.addNewGroupForm.value));
    this.dataservice.addGroup(this.addNewGroupForm.value).subscribe(
      (response)=>{
        this.toastr.success('Group hozzáadva', 'Siker!');
        this.getgroups();
      },
      (error)=>console.log(error)
    );
  }

  addNewTeam(){
    console.log(this.addNewTeamForm);
    this.dataservice.addTeam(this.addNewTeamForm.value).subscribe(
      (response)=>{this.toastr.success("Csapat sikeres létrejött","Siker!");this.getteams();},
      (error)=>{this.toastr.error("Nem sikerült hozzáadni a csapatot!","Hiba!")}
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

  getgroups(){
    this.dataservice.getGroups().subscribe(
      (response)=>{
        console.log(response);
        this.groups = response.json();
      },
      (error)=>console.log(error)
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
        this.getteams();
      }
    )
  }

  EditGroup(group){
    console.log(group);
    this.dataservice.updateGroup(group).subscribe(
      (x)=>{
        this.toastr.success('Sikeres mentés!', 'Üzenet',{positionClass:"toast-bottom-left"});
      }
    )
  }

  DeleteGroup(group){
    console.log(group);
    this.dataservice.deleteGroup(group).subscribe(
      (x)=>{
        this.toastr.success('Sikeres Törlés!', 'Üzenet');
        this.getgroups();
      }
    )
  }

}
