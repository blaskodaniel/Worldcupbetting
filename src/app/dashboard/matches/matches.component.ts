import { FormControl, Validators } from '@angular/forms';
import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches:any;
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
    this.addNewForm = new FormGroup({
      'teamA': new FormControl(null,Validators.required),
      'teamB': new FormControl(null, Validators.required),
      'date':new FormControl(null,Validators.required)
    });
  }

  GetMatches(){
    this.dataservice.getMatches().subscribe(
      (response)=>{
        console.log(response);
        this.matches = JSON.parse(response["_body"]);
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

  addNew(){
    this.dataservice.addMatch(this.addNewForm.value).subscribe(
      (response)=>{this.toastr.success("A mérkőzés sikeres létrejött","Siker!");this.GetMatches();},
      (error)=>{this.toastr.error("Nem sikerült hozzáadni a mérkőzést!","Hiba!")}
    )
  }

  Delete(){
    
  }

}
