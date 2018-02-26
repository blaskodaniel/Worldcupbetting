import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { Coupon } from '../_interfaces/coupon';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user;
  img_success:String = "./assets/img/medal.png";
  coupon:Coupon;

  constructor(private dataservice:DataService,private authservice:AuthService) { }

  ngOnInit() {
    this.dataservice.getUserById(this.authservice.getUserId()).subscribe(
      (user)=>{
        console.log(user);
        this.user = user;
      },
      (error)=>{
        console.log("Error");
      }
    )
    this.getCoupons();
  }

  getCoupons(){
    this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
      (coupon:Coupon)=>{
        this.coupon = coupon;
      }
    )
  }

  removeCoupon(c){
    this.dataservice.removeCoupon(c).subscribe(
      response=>{
        console.log("Törlés sikeres");
        this.getCoupons();
      }
    )
  }

}
