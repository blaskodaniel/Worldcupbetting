import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Match } from '../_interfaces/match';
import { DataService } from '../_services/data.service';
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
  @Input() match:Match;
  outcome:any[] = [
    {name:"oddsAwin",sign:"1"},
    {name:"oddsDraw",sign:"X"},
    {name:"oddsBwin",sign:"2"}
  ];
  isSelectedOdds:string;
  SelectedOdds:string;

  constructor(private betservice:BetcartService, 
    private tools:ToolsService, private dataservice:DataService) {
  }

  ngOnInit() {
  }

  oddsClick(matchobject,odds,event,akt){
    let hasClass = event.currentTarget.classList.contains("activeOdds");
    if(hasClass){
      let betCoupon:betCouponObject = {
        matchobj:matchobject,
        base:event.currentTarget.id,
        todo:"out"
      }
      this.betservice.betListObservable.next(betCoupon);
      event.currentTarget.classList.remove("activeOdds");
    }else{
      this.SelectedOdds = akt;
      // Készítünk egy szelvényt
      let betCoupon:betCouponObject = {
          matchobj:matchobject,
          base:event.currentTarget.id,
          todo:"in"
      }
      // A szelvényt beletesszük a kosárba
      this.betservice.betListObservable.next(betCoupon);
    }

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
