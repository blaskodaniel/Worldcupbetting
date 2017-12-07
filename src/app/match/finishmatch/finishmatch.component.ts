import { DataService } from '../../_services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finishmatch',
  templateUrl: './finishmatch.component.html',
  styleUrls: ['./finishmatch.component.css']
})
export class FinishmatchComponent implements OnInit {
  matches:any;
  constructor(private dataservice:DataService) { }

  ngOnInit() {

  }

}
