import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { Match } from '../_interfaces/match';
import { User } from '../_models/user.models';
import { ServerResponse } from '../_interfaces/serverResponse';
import { Team } from '../_models/team.model';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  fullname: String;
  username: String;
  teamid: String;
  img_success: String = "./assets/icons/medal3.png";
  img_lose: String = "./assets/icons/lose.png";
  coupon: Coupon[];
  backupBet: Number;
  actcoupons: Coupon[];
  finishcoupons: Coupon[];
  stat_winCoupon: number;
  stat_loseCoupon: number;
  teams: Team[];

  constructor(private dataservice: DataService, private authservice: AuthService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    
    this.getUser();
    this.getCoupons();
    this.GetTeams();
  }

  getCoupons() {
    this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
      (coupon: Coupon[]) => {
        this.coupon = coupon;
        this.stat_winCoupon = this.coupon.filter(x => x.success === true).length;
        this.stat_loseCoupon = this.coupon.filter(x => x.success === false).length;
        this.actcoupons = this.coupon.filter(x => x.matchid["active"] === 0 || x.matchid["active"] === 1);
        this.finishcoupons = this.coupon.filter(x => x.matchid["active"] === 2);
      }
    )
  }

  getUser() {
    this.dataservice.getUserById(this.authservice.getUserId()).subscribe(
      (user: User) => {
        console.log(user);
        this.user = user;
        this.teamid = this.user.teamid as string;
        if (this.user.username) {
          this.username = this.user.username;
        }
        if (this.user.name) {
          this.fullname = this.user.name;
        }
      },
      (error) => {
        console.log("Error");
      }
    )
  }

  GetTeams() {
    this.dataservice.getTeams().subscribe(
      (response) => {
        console.log(response);
        this.teams = JSON.parse(response["_body"]);
      },
      (error) => console.log(error)
    )
  }

  winnerPoint(c:Coupon){
    let teamAid = this.teams.find(x=>x.name === c.teamA);
    let teamBid = this.teams.find(x=>x.name === c.teamB);
    console.log(`teamAid:${JSON.stringify(c)}`);
    if(teamAid._id === this.user.teamid || teamBid._id === this.user.teamid){
      return (+c.bet*+c.odds*2)
    }else{
      return (+c.bet*+c.odds)
    }
  }


  profilSave(values) {
    console.log(values);
    this.dataservice.saveProfil(this.user._id, values.fullname, values.username, values.teamid).subscribe(
      (x) => {
        this.toastr.success("Sikeresen mentetted a profilod");
      },
      (err) => {
        this.toastr.error("Sikertelen mentés");
      }
    )
  }

}
