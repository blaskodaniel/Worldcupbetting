import { DataService } from '../_services/data.service';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Match } from '../_interfaces/match';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isActive = false;
  matches:Match[] = [];

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getMatches().subscribe(
      (response)=>{
        console.log(response);
        this.matches = JSON.parse(response["_body"]);;
      },
      (error)=>console.log(error)
    )
  }

  test(){
    this.isActive = !this.isActive;
  }

}
