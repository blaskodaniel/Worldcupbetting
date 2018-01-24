import { DataService } from '../_services/data.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Match } from '../_interfaces/match';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isActive = false;
  ActiveMatches:Match[] = [];
  betresult:number;

  constructor(private dataservice:DataService) { 
    
  }

  ngOnInit() {
    this.dataservice.getMatches("?active=1").subscribe(
      (response)=>{
        this.ActiveMatches = response.json();
      },
      (error)=>console.log(error)
    )
    
  }

}
