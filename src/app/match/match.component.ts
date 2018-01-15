import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Match } from '../_interfaces/match';
import { BetcartService } from '../_services/betcart.service';
import { betCouponObject } from '../_interfaces/betCoupon';
import { ToolsService } from '../_services/tools.service';
declare var $ :any;

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit  {
  @Input() matches:Match[];
  @ViewChild('awin') awin: ElementRef;
  @ViewChild('draw') draw: ElementRef;
  @ViewChild('bwin') bwin: ElementRef;
  isSelectedOdds:boolean = false;

  constructor(private betservice:BetcartService, private tools:ToolsService ) {
  }

  ngOnInit() {
  }

  oddsClick(matchobject,odds,event){
    let parent = $(event.currentTarget).parent("div.row");
    if(!this.isSelectedOdds){
      // Készítünk egy szelvényt
      let betCoupon:betCouponObject = {
        matchobj:matchobject,
        base:event.currentTarget.id,
        todo:"in"
      }
      // A szelvényt beletesszük a kosárba
      this.betservice.betListObservable.next(betCoupon);
      event.currentTarget.classList.add("activeOdds");
      this.isSelectedOdds = true;
    }else{
      // Kivesszük a szelvényt
      let betCoupon:betCouponObject = {
        matchobj:matchobject,
        base:event.currentTarget.id,
        todo:"out"
      }
      this.betservice.betListObservable.next(betCoupon);
      event.currentTarget.classList.remove("activeOdds");
      this.isSelectedOdds = false;
    }
    // if(parent.hasClass("hasActiveOdds")){
    //   let betCoupon:betCouponObject = {
    //     matchobj:matchobject,
    //     base:event.currentTarget.id,
    //     todo:"out"
    //   }
    //   this.betservice.betListObservable.next(betCoupon);
    //   parent.removeClass("hasActiveOdds");
    //   event.currentTarget.classList.remove("activeOdds");
    // }
    // else{
    //   let betCoupon:betCouponObject = {
    //     matchobj:matchobject,
    //     base:event.currentTarget.id,
    //     todo:"in"
    //   }
    //   this.betservice.betListObservable.next(betCoupon);
    //   event.currentTarget.classList.add("activeOdds");
    //   parent.addClass("hasActiveOdds");
    // }
  }

  isSelected(base64string){
    let index = this.betservice.storageList.findIndex(x=>x.base === base64string);
    if(index != -1){
      let classes =  {
        activeOdds: true
      };
      return classes;
    }else{
      let classes =  {
        activeOdds: false
      };
      return classes;
    }
  }

}
