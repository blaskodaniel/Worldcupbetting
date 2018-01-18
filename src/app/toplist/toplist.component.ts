import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {
  selectedname:string;
  test:any[] = [
    {name:"Dani",pont:23},
    {name:"Sanyi",pont:10},
    {name:"Gabi",pont:17},
    {name:"Tibi",pont:12}
  ];

  constructor() { }

  Selected(data){
    this.selectedname = data.name;
  }

  ngOnInit() {
  }

}
