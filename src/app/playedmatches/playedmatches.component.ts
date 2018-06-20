import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Match } from '../_interfaces/match';
import { DataService } from '../_services/data.service';
import { ToastsManager } from 'ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { AuthService } from '../_services/auth.service';
import { ErrorHTTP } from '../_models/errorhttp.model';
declare var $: any;

@Component({
  selector: 'app-playedmatches',
  templateUrl: './playedmatches.component.html',
  styleUrls: ['./playedmatches.component.css']
})
export class PlayedmatchesComponent implements OnInit {
  PlayedMatches:Match[] = [];
  UsersCoupons:Coupon[] = [];
  ActiveMatchesGroupby = [];
  arrow_up = "./assets/icons/arrow_up.png";
  arrow_down = "./assets/icons/arrow_down.png";
  accordion1 = false;

  constructor(private dataservice:DataService,public authservice:AuthService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    
  }

  ngOnInit(){
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    this.loadMatchList();
  }

  openstage(){
    this.accordion1 = !this.accordion1;
  }

  loadMatchList(){
    this.dataservice.getMatches("?active=2").subscribe(
      (response:Match[])=>{
        this.PlayedMatches = response;
        this.ActiveMatchesGroupby = this.groupby(this.PlayedMatches, 'type');
        let index = 0;
        let openPart = 1;
        this.ActiveMatchesGroupby.map(w=>{
          if(index === openPart){
            w.type = false;
          }else{
            w.type = true;
          }
          index++;
        });
        if(this.authservice.isAuthenticated()){
          // If the user is log in then load the user's coupons
          this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
            (coupon:Coupon[])=>{
              this.UsersCoupons = coupon;
              this.filterMatches(this.PlayedMatches,this.UsersCoupons);
            }
          )
        }
      },
      (error:ErrorHTTP)=>{
        this.toastr.error("Sajnos jelenleg nem érhető el kapcsolat a szerverrel. Próbáld meg később.","Szerver nem elérhető",{
          positionClass:'toast-top-full-width',
          timeOut: 0,
        })
      }
    )
  }

  filterMatches(matches:Match[],coupons:Coupon[]):void{
    let blockMatches = matches.filter(x=>{
      let coupon = coupons.find(c=>c.matchid["_id"] == x._id);
      if(coupon){
        x["blocked"] = true;
        x["matchoutcome"] = coupon.outcome;
      }
    });
  }

  groupby(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
  };

}
