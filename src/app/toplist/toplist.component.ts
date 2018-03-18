import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.models';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {
  players:User[];

  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(){
    this.dataservice.getPlayers().subscribe(
      x=>{
        this.players = <User[]>x;
      })
  }

}
