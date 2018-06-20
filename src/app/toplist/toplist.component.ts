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
  gold_medal = "./assets/icons/gold-medal.png";
  silver_medal = "./assets/icons/silver-medal.png";
  bronz_medal = "./assets/icons/bronze-medal.png";

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
