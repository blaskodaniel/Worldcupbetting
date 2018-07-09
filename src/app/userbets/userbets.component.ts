import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { Coupon } from '../_interfaces/coupon';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-userbets',
  templateUrl: './userbets.component.html',
  styleUrls: ['./userbets.component.css']
})
export class UserbetsComponent implements OnInit {
  userscoupons:Coupon[];
  matchdata: Coupon;
  aktuser:string;

  constructor(private route: ActivatedRoute, private dataservice: DataService, private authservice:AuthService) { }

  ngOnInit() {
    this.aktuser = this.authservice.getUsername();
    let id = this.route.params.subscribe(x => {
      console.log("PARAM:" + x['id']);
      this.dataservice.getUserBetsByMatchId(x['id']).subscribe(
        (x: Coupon[]) => {
          console.log(JSON.stringify(x[0]))
          this.userscoupons = x;
          this.userscoupons = this.userscoupons.filter(x=>x.username != "admin");
          this.userscoupons.map(x=>{
            if(x.userid.teamid == x.matchid.teamA || x.userid.teamid == x.matchid.teamB){
              x.favoriteTeam = true;
            }else{
              x.favoriteTeam = false;
            }
            if(x.outcome.toLowerCase() === 'x'){
              x.odds = x.matchid.oddsDraw;
            }else if(x.outcome.toLowerCase() === '1'){
              x.odds = x.matchid.oddsAwin;
            }else{
              x.odds = x.matchid.oddsBwin;
            }
          })
          this.sortByName();
          this.matchdata = x[0];
          console.log(JSON.stringify(x[0]));
        }
      )
    });
  }

  sortByName(){
    this.userscoupons.sort((a:Coupon,b:Coupon)=>{
      if(a.username > b.username){
        return 1;
      }else if(a.username < b.username){
        return -1;
      }else{
        return 0;
      }
    });
  }

  sortByBet(){
    this.userscoupons.sort((a:Coupon,b:Coupon)=>{
      if(a.bet > b.bet){
        return -1;
      }else if(a.bet < b.bet){
        return 1;
      }else{
        return 0;
      }
    });
  }

  sortOutcome(){
    this.userscoupons.sort((a:Coupon,b:Coupon)=>{
      if(a.outcome > b.outcome){
        return -1;
      }else if(a.outcome < b.outcome){
        return 1;
      }else{
        return 0;
      }
    });
  }

  sortByResult(){
    this.userscoupons.sort((a:Coupon,b:Coupon)=>{
      if(((a.bet*a.odds)-a.bet) > ((b.bet*b.odds)-b.bet)){
        return -1;
      }else if(((a.bet*a.odds)-a.bet) < ((b.bet*b.odds)-b.bet)){
        return 1;
      }else{
        return 0;
      }
    });
  }

}
