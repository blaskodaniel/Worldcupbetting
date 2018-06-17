import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { Coupon } from '../_interfaces/coupon';

@Component({
  selector: 'app-userbets',
  templateUrl: './userbets.component.html',
  styleUrls: ['./userbets.component.css']
})
export class UserbetsComponent implements OnInit {
  userscoupons:Coupon[];
  matchdata: Coupon;

  constructor(private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit() {
    let id = this.route.params.subscribe(x => {
      console.log("PARAM:" + x['id']);
      this.dataservice.getUserBetsByMatchId(x['id']).subscribe(
        (x: Coupon[]) => {
          this.userscoupons = x;
          this.userscoupons.map(x=>{
            if(x.userid.teamid == x.matchid.teamA || x.userid.teamid == x.matchid.teamB){
              x.favoriteTeam = true;
            }else{
              x.favoriteTeam = false;
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
