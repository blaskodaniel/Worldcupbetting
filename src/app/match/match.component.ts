import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../_interfaces/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  @Input() matches:Match[];
  constructor() { }

  ngOnInit() {
  }

}
