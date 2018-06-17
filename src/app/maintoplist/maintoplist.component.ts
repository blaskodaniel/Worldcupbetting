import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../_services/data.service';
import { ToastsManager } from 'ng2-toastr';
import { User } from '../_models/user.models';

@Component({
  selector: 'app-maintoplist',
  templateUrl: './maintoplist.component.html',
  styleUrls: ['./maintoplist.component.css']
})
export class MaintoplistComponent implements OnInit {
  players:User[];
  
  constructor(private dataservice: DataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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
