import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-teamsgroups',
  templateUrl: './teamsgroups.component.html',
  styleUrls: ['./teamsgroups.component.css']
})
export class TeamsgroupsComponent implements OnInit {
  teams:any;
  teamsearch:string;
  teamOrderKey:string = 'name';
  teamOrderReverse:boolean = false;
  
  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    
    this.getteams();
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
        
      }
    )
  }

}
