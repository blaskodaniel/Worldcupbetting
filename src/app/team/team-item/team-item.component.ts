import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  id:number;
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        // Ha minden rendben van, megérkezik az adat
        // Unary (+) Operator: cast string to number
        this.id = +params['id'];
        console.log(this.id);
      },()=>{
        // Ha hiba van

      },()=>{
        // Ha vége van a folyamatnak

      })
  }

}
