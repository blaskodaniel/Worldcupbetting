import { DataService } from '../_services/data.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Match } from '../_interfaces/match';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { AuthService } from '../_services/auth.service';
import { Betinfo } from '../_interfaces/betinfo';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { User } from '../_models/user.models';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ActiveMatches:Match[] = [];
  ResolverMatch:Match[] = [];
  UsersCoupons:Coupon[] = [];
  newCoupon:Coupon;
  currentUser: User;
  betvalue:number = 0;
  currentMatch:Match;
  currentOdds:number;
  currentResult:String;
  currentTeam:String;

  error_status:boolean = false;
  error_msg:string = "";

  constructor(private dataservice:DataService,public authservice:AuthService,private route: Router,private activatedRoute:ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    
  }

  ngOnInit(){
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    this.ResolverMatch = this.activatedRoute.snapshot.data['matches'];
    this.loadMatchList();
    this.getUser();
  }

  loadMatchList(){
    this.dataservice.getMatches("?active=0").subscribe(
      (response:Match[])=>{
        this.ActiveMatches = response;
        if(this.authservice.isAuthenticated()){
          // If the user is log in then load the user's coupons
          this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
            (coupon:Coupon[])=>{
              this.UsersCoupons = coupon;
              this.filterMatches(this.ActiveMatches,this.UsersCoupons);
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

  ModalClose() {
    $("#betModal").modal('hide');
  }

  CreateCoupon(teamAid,teamBid,matchid){
    if(this.authservice.isAuthenticated()){
      if(this.betvalue > 0){
        console.log("Fogadás mentése");
        this.newCoupon = {
          bet:this.betvalue, // mennyi pontot tett fel
          odds: +this.currentOdds, // aktuális odds
          result: this.betvalue*+this.currentOdds, // nyereménye
          outcome: this.currentResult,
          matchid: matchid,
          teamA: teamAid,
          teamB: teamBid,
          userid: this.authservice.getUserId() as any,
          username: this.authservice.getUsername()
        }
        console.log("Fogadás:"+JSON.stringify(this.newCoupon));
        this.dataservice.addCoupon(this.newCoupon).subscribe(
          result => {
            console.log(result);
            this.loadMatchList();
            this.ModalClose();
            this.toastr.success('Sikeres fogadás', 'Üzenet',{positionClass:"toast-bottom-left"});
          },
          error => {
            this.error_status = true;
            if(error.error.code === 2){
              this.error_msg = "Nincs ennyi pontod!";
            }
            if(error.error.code === 1){
              this.error_msg = "Erre a mérkőzésre már nem fogadthatsz!";
            }
            console.log("Hiba a szelvény mentése közben")
          }
        )
      }else{
        this.toastr.error('Minimum 1 pontot fel kell raknod!','Hiba',{positionClass:"toast-bottom-left"});
      }
    }else{
      this.ModalClose();
      this.route.navigate(['/login']);
    }
    
  }

  getUser() {
    this.dataservice.getUserById(this.authservice.getUserId()).subscribe(
      (user: User) => {
        console.log(user);
        this.currentUser = user;
      },
      (error) => {
        console.log("Error");
      }
    )
  }

  openModal(betinfo:Betinfo,match){
    if(!match.blocked){
      this.currentMatch = match;
      this.currentTeam = betinfo.selectedTeam;
      this.currentOdds = betinfo.selectedOdds;
      this.currentResult = betinfo.selectedResult;
      console.log(betinfo.selectedTeam);
      $("#betModal").modal();
    }
    
  }

}
