import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { betCouponObject } from '../_interfaces/betCoupon';
import { betCartStorage } from '../_interfaces/betCartStorage';
 
@Injectable()
export class BetcartService{
    counter:number = 0;
    storageList:betCartStorage[] = [];

    //Create Observable
    betListObservable = new Subject();
    
    constructor() {
        console.log("betcart service konstruktor");
        if(localStorage.getItem("cart")){
            localStorage.removeItem("cart");
            // if(<betCartStorage[]>JSON.parse(localStorage.getItem("cart"))){
            //     this.storageList = [];
            //     this.storageList = <betCartStorage[]>JSON.parse(localStorage.getItem("cart"));
            //     this.counter = this.storageList.length;
            // }
        }
    }

    
}
