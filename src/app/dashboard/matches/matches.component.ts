import { FormControl, Validators } from '@angular/forms';
import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Match } from '../../_interfaces/match';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:any;
  teams:any;
  search:string;
  OrderKey:string = 'name';
  OrderReverse:boolean = false;
  // FromGroups:
  addNewForm:FormGroup;

  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.GetMatches();
    this.GetTeams();
    
    this.addNewForm = new FormGroup({
      'teamA': new FormControl(null,Validators.required),
      'teamB': new FormControl(null, Validators.required),
      'date':new FormControl(null,Validators.required)
    });
  }

  GetMatches(){
    this.dataservice.getMatches("").subscribe(
      (response)=>{
        console.log(response);
        this.matches = response;
        this.sortBy();
      },
      (error)=>console.log(error)
    )
  }

  GetTeams(){
    this.dataservice.getTeams().subscribe(
      (response)=>{
        console.log(response);
        this.teams = JSON.parse(response["_body"]);
      },
      (error)=>console.log(error)
    )
  }

  Edit(item){
    this.dataservice.updateMatch(item).subscribe(
      (response)=>{this.toastr.success("A mérkőzést sikeresen frissítettük","Siker!");this.GetMatches();},
      (error)=>{this.toastr.error("Nem sikerült frissíteni a mérkőzést!","Hiba!")}
    )
  }

  sortBy(){
    this.matches = this.matches.sort((a,b)=>{
      if(a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      else return 0;
    });
  }

  addNew(){
    this.dataservice.addMatch(this.addNewForm.value).subscribe(
      (response)=>{this.toastr.success("A mérkőzés sikeres létrejött","Siker!");this.GetMatches();},
      (error)=>{this.toastr.error("Nem sikerült hozzáadni a mérkőzést!","Hiba!")}
    )
  }

  Delete(match:Match){
    this.dataservice.deleteMatch(match).subscribe(
      x=>{
        this.toastr.success("Remove succesfully!");
        this.GetMatches();
      }
    )
  }

  refreshOdds(){
    if(window.confirm("Biztosan frissíted az összes Odds-ot?")){
      this.dataservice.refreshOdds().subscribe(
        x=>{
          this.toastr.success("Oddsok frissítése rendben lezajlott.");
          this.GetMatches();
        }
      )
    }
  }

}
