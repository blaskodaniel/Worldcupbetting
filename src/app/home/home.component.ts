import { DataService } from '../_services/data.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Match } from '../_interfaces/match';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { AuthService } from '../_services/auth.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isActive = false;
  ActiveMatches:Match[] = [];
  newCoupon:Coupon;
  betresult:number;
  betvalue:number = 0;
  currentMatch:Match;
  currentOdds:string;
  currentResult:string;

  constructor(private dataservice:DataService,public authservice:AuthService,) { 
    
  }

  ngOnInit() {
    this.dataservice.getMatches("?active=1").subscribe(
      (response)=>{
        this.ActiveMatches = response.json();
      },
      (error)=>console.log(error)
    )
  }

  openBetModal(match,event){
    //console.log(match);
    this.currentMatch = match;
    let betHTMLElement:HTMLCollection = event.currentTarget.getElementsByClassName("activeOdds");
    if(betHTMLElement.length > 0){
      console.log("Aktivált fogadás");
      const __odds:NodeListOf<Element> = betHTMLElement[0].getElementsByClassName("oddsvalue");
      const __result:NodeListOf<Element> = betHTMLElement[0].getElementsByClassName("oddspos");
      this.currentOdds = __odds[0].innerHTML;
      this.currentResult = __result[0].innerHTML;
      $("#betModal").modal();
    }else{
      console.log("Deaktivált fogadás");
    }
    
  }

  ModalClose() {
    console.log("Close")
  }

  BettingStart(teamAid,teamBid,matchid){
    console.log("Fogadás mentése");
    this.newCoupon = {
      bet:this.betvalue,
      odds: +this.currentOdds,
      result: this.betvalue*+this.currentOdds,
      matchid: matchid,
      teamA: teamAid,
      teamB: teamBid,
      userid: this.authservice.getUserId() as any,
      username: this.authservice.getUsername()
    }
    this.dataservice.addCoupon(this.newCoupon).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log("Hiba a szelvény mentése közben")
      }
    )
  }

}
