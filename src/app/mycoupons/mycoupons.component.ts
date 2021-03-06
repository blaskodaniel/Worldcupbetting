import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user.models';
import { Coupon } from '../_interfaces/coupon';
import { Team } from '../_models/team.model';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { ToastsManager } from 'ng2-toastr';
import { ServerResponse } from '../_interfaces/serverResponse';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { Match } from '../_interfaces/match';
import { AppService } from '../_services/app.service';
declare var $: any;

@Component({
  selector: 'app-mycoupons',
  templateUrl: './mycoupons.component.html',
  styleUrls: ['./mycoupons.component.css']
})
export class MycouponsComponent implements OnInit {
  private user: User;
  teamid: String;
  img_success: String = "./assets/icons/medal3.png";
  img_lose: String = "./assets/icons/lose.png";
  modCoupon: Coupon;
  coupon: Coupon[];
  backupBet: Number;
  actcoupons: Coupon[];
  finishcoupons: Coupon[];
  stat_winCoupon: number;
  stat_loseCoupon: number;
  teams: Team[];
  oddsList: number[] = [];
  favoritTeamFactor = this.appService.favoritTeamFactor;

  constructor(private dataservice: DataService, private authservice: AuthService, private appService: AppService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.modCoupon = {
      userid: {} as User,
      matchid: {} as Match,
      username: "",
      teamA: {} as Team,
      teamB: {} as Team,
      bet: 0,
      odds: 0,
      result: 0,
      outcome: ""
    }
  }

  async ngOnInit() {
    for(let i = 200; i<2001;i++){
      if(i%100 == 0){
        this.oddsList.push(i);
      }
    }
    if ($("#myNavbar").hasClass("in")) {
      $('.navbar-toggle').click();
    }
    this.getUser();
    this.getCoupons();
    
  }

  getCoupons() {
    this.dataservice.getCouponsByUserIs(this.authservice.getUserId()).subscribe(
      (coupon: Coupon[]) => {
        this.coupon = coupon;
        if (this.coupon != null) {
          this.stat_winCoupon = this.coupon.filter(x => x.success === true).length;
          this.stat_loseCoupon = this.coupon.filter(x => x.success === false).length;
          this.actcoupons = this.coupon.filter(x => x.matchid["active"] === 0 || x.matchid["active"] === 1);
          this.coupon.map(x => x.accordion = true);
          this.sortBy();
          this.finishcoupons = this.coupon.filter(x => x.matchid["active"] === 2);
          this.finishcoupons.sort((x,y) => {
            if(x.date > y.date){
              return -1
            }else if(x.date < y.date){
              return 1
            }else{
              return 0;
            }
          });
          this.GetTeams();
        }
      }
    )
  }

  sortBy(){
    this.actcoupons = this.actcoupons.sort((a,b)=>{
      if(a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      else return 0;
    });
  }

  getUser() {
    this.dataservice.getUserById(this.authservice.getUserId()).subscribe(
      (user: User) => {
        // console.log(user);
        this.user = user;
        this.dataservice.updateScore(this.user.score);
        this.teamid = this.user.teamid._id;
      },
      (error) => {
        console.log("Error");
      }
    )
  }

  GetTeams() {
    this.dataservice.getTeams().subscribe(
      (response) => {
        // console.log(response);
        this.teams = JSON.parse(response["_body"]);
        this.extendCoupon();
      },
      (error) => console.log(error)
    )
  }

  extendCoupon() {
    this.coupon.map(c=>{
      if (this.teams != null) {
        let teamAid = this.teams.find(x => x.name === c.teamA);
        let teamBid = this.teams.find(x => x.name === c.teamB);
        console.log(`favoriteTeam lefut`);
        if (teamAid._id === this.user.teamid || teamBid._id === this.user.teamid) {
          c.favoriteTeam = true;
          c.win = (+c.bet * +(+c.odds) * this.favoritTeamFactor);
        } else {
          c.favoriteTeam = false;
          c.win = (+c.bet * +(+c.odds));
        }
      }
    });
  }

  winnerPoint(c: Coupon) {
    if (this.teams != null) {
      let teamAid = this.teams.find(x => x.name === c.teamA);
      let teamBid = this.teams.find(x => x.name === c.teamB);
      console.log(`winnerPoint lefut`);
      if (teamAid._id === this.user.teamid || teamBid._id === this.user.teamid) {
        return (+c.bet * +(+c.odds) * 2)
      } else {
        return (+c.bet * +(+c.odds))
      }
    }
  }

  openModal(coupon: Coupon) {
    this.modCoupon = coupon;
    this.backupBet = +coupon.bet;
    console.log(`Tét: ${this.modCoupon.bet}, Csapatok: ${this.modCoupon.teamA}`);
    $("#updateCoupon").modal();
  }

  updateCoupon(coupon: Coupon): void {
    if (coupon.bet > 0 && !isNaN(coupon.bet)) {
      console.log(`Tét: ${coupon.bet}, Csapatok: ${coupon.teamA}`);
      this.dataservice.updateCoupon(coupon).subscribe(
        (x: ServerResponse) => {
          if (x.status == undefined) {
            this.toastr.success("A kuponod sikeresen módosult.");
            this.getUser();
            this.getCoupons();
            $("#updateCoupon").modal('toggle');
          } else {
            if (x.code == 2) {
              this.toastr.error("Nincs ennyi pontod");
            }
            if(x.code == 6){
              this.toastr.error("Már fut a mérkőzés. Nem tudsz módosítani.");
            }
          }

        },
        (x: ErrorHTTP) => {
          this.toastr.error(x.uimessage);
        }
      )
    } else {
      this.toastr.error("Csak pozitív számot adj meg!");
    }
  }

  cancelupdateCoupon() {
    this.modCoupon.bet = +this.backupBet;
  }

  removeCoupon(c) {
    if (confirm("Biztosan törlöd?")) {
      this.dataservice.removeCoupon(c).subscribe(
        response => {
          console.log("Törlés sikeres");
          this.getUser();
          this.getCoupons();
        }
      )
    }
  }

}
