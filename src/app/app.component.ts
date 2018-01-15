import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) { 
    console.log("AppComponent constructor");
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(){
    console.log("AppComponent OnInit");
  }
}
