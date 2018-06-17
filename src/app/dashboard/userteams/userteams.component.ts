import { Component, OnInit } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { Team } from '../../_models/team.model';
import { Coupon } from '../../_interfaces/coupon';

@Component({
  selector: 'app-userteams',
  templateUrl: './userteams.component.html',
  styleUrls: ['./userteams.component.css']
})
export class UserteamsComponent implements OnInit {
  list: any;
  teams: Team[];
  users: any;
  teszt: any;
  coupons: Coupon[];

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getCoupons(){
    this.dataservice.getAllCoupons().subscribe(
      (x:Coupon[])=>{
        this.coupons = x;
        for(let i=0;i<this.users.length;i++){
          var c = 0;
          this.coupons.map(x=>{
            if(x.userid._id == this.users[i]["_id"]){
              c++;
            }
          });
          this.users[i].couponlength = c;
        }
      }
    )
  }

  getTeams(){
    this.dataservice.getTeamsTypeWithAuth().subscribe(
      (x:Team[])=>{
        this.teams = x;
        for(let i=0;i<this.users.length;i++){
          this.users[i].groupAteam = this.teams.filter(x=>x._id == this.users[i]["groupA"]);
          this.users[i].groupBteam = this.teams.filter(x=>x._id == this.users[i]["groupB"]);
          this.users[i].groupCteam = this.teams.filter(x=>x._id == this.users[i]["groupC"]);
          this.users[i].groupDteam = this.teams.filter(x=>x._id == this.users[i]["groupD"]);
          this.users[i].groupEteam = this.teams.filter(x=>x._id == this.users[i]["groupE"]);
          this.users[i].groupFteam = this.teams.filter(x=>x._id == this.users[i]["groupF"]);
          this.users[i].groupGteam = this.teams.filter(x=>x._id == this.users[i]["groupG"]);
          this.users[i].groupHteam = this.teams.filter(x=>x._id == this.users[i]["groupH"]);
        }
        this.getCoupons();
        
        //this.teszt = this.teams.filter(x=>x._id == this.users["groupA"]);
        console.log(this.users);
      }
    )
  }

  getUsers(){
    this.dataservice.getAllUsersWithIds().subscribe(
      x=>{
        this.users = x;
        this.getTeams();
      }
    )
  }

}
