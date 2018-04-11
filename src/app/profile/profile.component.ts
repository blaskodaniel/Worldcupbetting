import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Coupon } from '../_interfaces/coupon';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { Match } from '../_interfaces/match';
import { User } from '../_models/user.models';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user:User;
  img_success: String = "./assets/img/medal.png";
  modCoupon:Coupon;
  coupon: Coupon[];
  backupBet: Number;
  actcoupons: Coupon[];

  constructor(private dataservice: DataService, private authservice: AuthService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr); 
    this.modCoupon = {
      userid:"",
      matchid:0,
      username:"",
      teamA: 0,
      teamB: 0,
      bet:0,
      odds:0,
      result:0,
      outcome:""
    }
  }

  ngOnInit() {
    this.getUser();
    this.getCoupons();
  }

  getCoupons() {
    this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
      (coupon: Coupon[]) => {
        this.coupon = coupon;
        this.actcoupons = this.coupon.filter(x=>x.matchid["active"] === 0 || x.matchid["active"] === 1);
      }
    )
  }

  getUser() {
    this.dataservice.getUserById(this.authservice.getUserId()).subscribe(
      (user:User) => {
        console.log(user);
        this.user = user;
      },
      (error) => {
        console.log("Error");
      }
    )
  }

  openModal(coupon:Coupon){
    this.modCoupon = coupon;
    this.backupBet = coupon.bet;
    console.log(`Tét: ${this.modCoupon.bet}, Csapatok: ${this.modCoupon.teamA}`);
    $("#updateCoupon").modal();
  }

  updateCoupon(coupon:Coupon):void{
    console.log(`Tét: ${coupon.bet}, Csapatok: ${coupon.teamA}`);
    this.dataservice.updateCoupon(coupon).subscribe(
      (x:Coupon)=>{
        this.toastr.success("A kuponod sikeresen módosult.");
        this.getUser();
        this.getCoupons();
      },
      (x:ErrorHTTP)=>{
        this.toastr.error(x.uimessage);
      }
    )
  }

  cancelupdateCoupon(){
    this.modCoupon.bet = this.backupBet;
  }

  removeCoupon(c) {
    this.dataservice.removeCoupon(c).subscribe(
      response => {
        console.log("Törlés sikeres");
        this.getUser();
        this.getCoupons();
      }
    )
  }

}
