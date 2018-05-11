import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loading = false;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private router:Router) { 
    console.log("AppComponent constructor");
    this.toastr.setRootViewContainerRef(vcr);
    
    // Subscribe to routerEvents
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(){
    console.log("AppComponent OnInit");
  }

  checkRouterEvent(routerEvent: Event): void{
    if(routerEvent instanceof NavigationStart){
      this.loading = true;
    }
    if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError){
      this.loading = false;
    }
  }
}
