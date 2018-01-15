import { Component, OnInit } from '@angular/core';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs:any;
  pagers = [];
  actualPage = 1;
  logsearch:string;
  OrderKey:string = 'date';
  OrderReverse:boolean = false;
  
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.getlogs(1);
  }

  getlogs(page:number){
    this.actualPage = page;
    this.logs = [];
    this.pagers = [];
    this.dataservice.getLogs(page).subscribe(
      (response)=>{
        console.log(response);
        this.logs = response;

        var pagecounter = 1;
        Array(this.logs.logcount)
        .fill(this.logs.logcount)
        .filter((x,i)=>{
          if(i%10==0 || i==0){
            this.pagers.push(pagecounter);
            pagecounter++;
          }
        });
      },
      (error)=>console.log(error)
    )
  }

  activePage(page){
    let classes =  {
      active: this.actualPage == page
    };
    return classes;
  }

  Delete(log){
    console.log(log);
    this.dataservice.deleteLog(log).subscribe(
      (x)=>{
        // delete successfuly
        this.getlogs(1);
      }
    )
  }

}
