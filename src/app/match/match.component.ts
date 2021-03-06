import { Component, Input,Output, OnInit, ViewChild, ElementRef, ViewContainerRef,EventEmitter } from '@angular/core';
import { Match } from '../_interfaces/match';
import { DataService } from '../_services/data.service';
import { BetcartService } from '../_services/betcart.service';
import { betCouponObject } from '../_interfaces/betCoupon';
import { ToolsService } from '../_services/tools.service';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Betinfo } from '../_interfaces/betinfo';
declare var $: any;

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() match: Match;
  @Output() resultClick: EventEmitter<Betinfo> = new EventEmitter<Betinfo>();
  
  outcome: any[] = [
    { name: "oddsAwin", sign: "1" },
    { name: "oddsDraw", sign: "X" },
    { name: "oddsBwin", sign: "2" }
  ];
  SelectedObject:Betinfo;
  SelectedOdds: string;

  constructor(private betservice: BetcartService,
    private tools: ToolsService, private dataservice: DataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.outcome.map(x => {
      let base64string = this.tools.decodeId(this.match._id, x.sign, this.match[x.name]);
      let index = this.betservice.storageList.findIndex(x => x.base === base64string);
      if (index != -1) {
        // selected
        this.SelectedOdds = x.sign;
      } else {
        // no selected
      }
    })

    
  }

  oddsClick(matchobject, odds, event, akt) {
    let teamname:String = "";
    let teamid:String = "";
    if(akt.name == "oddsAwin"){
      teamname = matchobject.teamA.name;
      teamid = matchobject.teamA._id;
    }else if(akt.name == "oddsBwin"){
      teamname = matchobject.teamB.name;
      teamid = matchobject.teamB._id;
    }else{
      teamname = "Döntetlen";
    }
    this.SelectedObject = {
      selectedOdds: +odds,
      selectedTeam: teamname,
      selectedTeamID: teamid,
      selectedResult: akt.sign
    }
    this.resultClick.emit(this.SelectedObject);
  }

}
