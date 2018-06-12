import { DataService } from '../_services/data.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Match } from '../_interfaces/match';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { AuthService } from '../_services/auth.service';
import { Betinfo } from '../_interfaces/betinfo';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { User } from '../_models/user.models';
import { AppService } from '../_services/app.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ActiveMatches:Match[] = [];
  TodayMatches:Match[] = [];
  ActiveMatchesGroupby = [];
  ResolverMatch:Match[] = [];
  UsersCoupons:Coupon[] = [];
  favoritepath = "./assets/icons/favorite.png";
  arrow_up = "./assets/icons/arrow_up.png";
  arrow_down = "./assets/icons/arrow_down.png";
  favoriteImg = this.appService.clientSetting.FavoriteTeamImage;
  accordion1 = false;
  today_moment = moment(new Date()).format("YYYYMMDD");
  newCoupon:Coupon;
  currentUser: User;
  betvalue:number;
  currentMatch:Match;
  currentOdds:number;
  currentResult:String;
  currentTeam:String;
  currentTeamID:String;
  favoritTeamFactor = this.appService.favoritTeamFactor;
  error_status:boolean = false;
  error_msg:string = "";
  oddsList: number[] = [];

  constructor(private dataservice:DataService,public authservice:AuthService,private appService: AppService,
    private route: Router,private activatedRoute:ActivatedRoute,
    public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    moment.locale("hu");
  }

  ngOnInit(){
    for(let i = 200; i<2001;i++){
      if(i%100 == 0){
        this.oddsList.push(i);
      }
    }
    if($("#myNavbar").hasClass("in")){
      $('.navbar-toggle').click();
    }
    this.ResolverMatch = this.activatedRoute.snapshot.data['matches'];
    this.loadMatchList();
    this.getUser();
  }

  openstage(){
    this.accordion1 = !this.accordion1;
  }

  groupby(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
  };

  loadMatchList(){
    this.dataservice.getMatches("?active=0&active=1").subscribe(
      (response:Match[])=>{
        this.ActiveMatches = response;
        this.sortBy();
        this.ActiveMatchesGroupby = this.groupby(this.ActiveMatches, 'type');
        
        this.TodayMatches = this.ActiveMatches.filter(x=>{
          if(moment(parseInt(x.date)).format("YYYYMMDD") == this.today_moment){
            return x;
          }
        })
        let openPart = -1;
        if(this.TodayMatches.length == 0){
          openPart = 0;
        }
        let index = 0;
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

  sortBy(){
    this.ActiveMatches = this.ActiveMatches.sort((a,b)=>{
      if(a.date < b.date) return -1;
      else if (a.date > b.date) return 1;
      else return 0;
    });
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
      if(this.betvalue > 199 && this.betvalue < 2001){
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
            console.log("Mentett fogadás: "+JSON.stringify(result));
            this.getUser();
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
        console.log("egweg");
        this.toastr.error('Minimum 200 maximum 2000 pontot tehetsz fel!','Hiba',{positionClass:"toast-bottom-left"});
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
        this.dataservice.updateScore(this.currentUser.score);
      },
      (error) => {
        console.log("Nincs bejelentkezve felhasználó");
      }
    )
  }

  openModal(betinfo:Betinfo,match){
    if(!match.blocked){
      this.currentMatch = match;
      this.currentTeam = betinfo.selectedTeam;
      this.currentTeamID = betinfo.selectedTeamID;
      this.currentOdds = betinfo.selectedOdds;
      this.currentResult = betinfo.selectedResult;
      this.betvalue = null;
      console.log(betinfo.selectedTeam);
      $("#betModal").modal();
    }
    
  }

}
