import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Coupon } from '../../_interfaces/coupon';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  coupons:Coupon[];
  couponsearch:string;
  couponOrderKey:string = 'username';
  couponOrderReverse:boolean = false;

  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getCoupons();
  }

  getCoupons(){
    this.dataservice.getAllCoupons().subscribe(
      (response:Coupon[])=>{
        console.log(response);
        this.coupons = response;
      },
      (error)=>console.log(error)
    )
  }

  EditCoupon(coupon){
    console.log(coupon);
    this.dataservice.updateCouponAdmin(coupon).subscribe(
      (x)=>{
        this.toastr.success('Sikeres mentés!', 'Üzenet',{positionClass:"toast-bottom-left"});
      }
    )
  }

  DeleteCoupon(coupon){
    console.log(coupon);
    this.dataservice.removeCoupon(coupon).subscribe(
      (x)=>{
        this.toastr.success('Sikeres Törlés!', 'Üzenet');
        this.getCoupons();
      }
    )
  }

}
