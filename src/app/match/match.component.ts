import { Component, Input, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Match } from '../_interfaces/match';
import { DataService } from '../_services/data.service';
import { BetcartService } from '../_services/betcart.service';
import { betCouponObject } from '../_interfaces/betCoupon';
import { ToolsService } from '../_services/tools.service';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: Match;
  
  outcome: any[] = [
    { name: "oddsAwin", sign: "1" },
    { name: "oddsDraw", sign: "X" },
    { name: "oddsBwin", sign: "2" }
  ];
  SelectedOdds: string;
  modalodds: number;
  modalresult: number;

  constructor(private betservice: BetcartService,
    private tools: ToolsService, private dataservice: DataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.outcome.map(x => {
      // decode: id,outcome,odds
      let base64string = this.tools.decodeId(this.match._id, x.sign, this.match[x.name]);
      let index = this.betservice.storageList.findIndex(x => x.base === base64string);
      if (index != -1) {
        // selected
        this.SelectedOdds = x.sign;
      } else {
        // no selected
        //this.SelectedOdds = "0";
      }
    })

    
  }

  oddsClick(matchobject, odds, event, akt) {
    const hasClass = event.currentTarget.classList.contains('activeOdds');
    if (hasClass) {
      const betCoupon: betCouponObject = {
        matchobj: matchobject,
        base: event.currentTarget.id,
        todo: 'out'
      }
      this.betservice.betListObservable.next(betCoupon);
      event.currentTarget.classList.remove('activeOdds');
      this.SelectedOdds = '0';
    } else {
      this.modalodds = +odds; // convert to number
      $("#addbet div.text_match").html(`<p>${matchobject.teamA.name} - ${matchobject.teamB.name}</p>`)
      $("#addbet div.text_bet").html(`<p>${odds}</p>`)
      //$("#addbet").modal();
      this.SelectedOdds = akt;
      // Készítünk egy szelvényt
      let betCoupon: betCouponObject = {
        matchobj: matchobject,
        base: event.currentTarget.id,
        todo: "in"
      }
      // A szelvényt beletesszük a kosárba
      this.betservice.betListObservable.next(betCoupon);
    }
  }

  addNewBetFunction() {
    
  }

  

  ModalBetting() {
    console.log("Bet")
  }

}
