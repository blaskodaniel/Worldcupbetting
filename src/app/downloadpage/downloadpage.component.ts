import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from '../_services/app.service';
import { DataService } from '../_services/data.service';
declare var $: any;
moment.locale("hu");

@Component({
  selector: 'app-downloadpage',
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.css']
})
export class DownloadpageComponent implements OnInit {
  excelimage ="./assets/icons/excel.png";
  update:String;

  constructor(private appsetting:AppService, private dataservice:DataService ) {}

  ngOnInit() {
    if ($("#myNavbar").hasClass("in")) {
      $('.navbar-toggle').click();
    }
    this.getExcelDate();
  }

  getExcelDate(){
    this.dataservice.getExcelDate().subscribe(
      x=>{
        var result = JSON.parse(x["_body"]);
        if(result.msg != "no"){
          this.update = moment(result.msg).fromNow();
        }
      }
    )
  }

}
