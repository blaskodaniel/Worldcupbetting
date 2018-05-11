import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ExtAPIMatch } from '../../_models/extapimatch';
import { ErrorHTTP } from '../../_models/errorhttp.model';
import { Match } from '../../_interfaces/match';
declare var $: any;

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css']
})
export class ExternalApiComponent implements OnInit {
  externalmatches:ExtAPIMatch[] | ErrorHTTP;
  matches: Match[] | ErrorHTTP;
  search:string;  
  selectedExternalMatch: ExtAPIMatch;
  selectedmatchid:Match = null;

  constructor(private dataservice:DataService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.GetExternalMatches();
    this.GetMatches();
  }

  GetExternalMatches(){
    this.dataservice.getExtAPIMatches("").subscribe(
      (response)=>{
        console.log(response);
        this.externalmatches = response;
      },
      (error)=>console.log(error)
    )
  }

  GetMatches(){
    this.dataservice.getMatches("").subscribe(
      (response)=>{
        console.log(response);
        this.matches = response;
      },
      (error)=>console.log(error)
    )
  }

  oddsrefresh(){
    this.dataservice.importExternalMatches().subscribe(
      x=>{
        this.toastr.success("Import successfuly!");
        this.GetExternalMatches();
      },
      err=>console.log("Hiba")
    )
  }

  attachMatch(){
    if(this.selectedmatchid != null){
      console.log(`Kiválasztott match: ${this.selectedmatchid.teamA["name"]} - ${this.selectedmatchid.teamB["name"]}`);
      console.log(`Kiválasztott extmatch: ${this.selectedExternalMatch.teamA} - ${this.selectedExternalMatch.teamB}`);
      this.dataservice.attachMatchToGame(this.selectedExternalMatch,this.selectedmatchid).subscribe(
        x=>{
          if(x.status){
            this.toastr.success("Attach successfuly!");
            this.GetMatches();
          }
        },
        (err)=>{
          this.toastr.error("Attach error!");
        }
      )
    }else{
      this.toastr.error("The match is required! Select a match.");
    }
    
  }

  openModal(match:ExtAPIMatch){
    this.selectedExternalMatch = match;
    $("#attach").modal();
  }

}
