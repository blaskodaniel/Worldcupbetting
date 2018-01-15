import { Component, OnInit } from '@angular/core';
import { BetcartService } from '../_services/betcart.service';
import { betCouponObject } from '../_interfaces/betCoupon';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-betcart',
  templateUrl: './betcart.component.html',
  styleUrls: ['./betcart.component.css']
})
export class BetcartComponent implements OnInit, OnDestroy {
  toggleOpen:boolean = false;
  betListObservableSubscription : Subscription;

  constructor(private betservice:BetcartService) { }

  ngOnInit() {
    this.betListObservableSubscription = this.betservice.betListObservable.subscribe(
      (item:betCouponObject) =>{
        if(item.todo === "in"){
          this.betservice.counter++;
          this.betservice.storageList.push({
            id:item.matchobj._id,
            base:item.base,
            match:{teamA:item.matchobj.teamA.name,teamB:item.matchobj.teamB.name}
          });
        }else if(item.todo === "out"){
          this.betservice.counter--;
          let removeindex = this.betservice.storageList.findIndex(x=>x.base === item.base);
          this.betservice.storageList.splice(removeindex,1);
        }
        localStorage.setItem("cart",JSON.stringify(this.betservice.storageList));
        console.log(JSON.stringify(this.betservice.storageList));
        
      }
    )
  }

  toggle(){
    let classes =  {
      openSWbtn: this.betservice.storageList.length > 0
    };
    return classes;
  }

  ngOnDestroy(){
    this.betListObservableSubscription.unsubscribe();
  }

}
