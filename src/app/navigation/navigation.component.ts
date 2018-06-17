import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../_services/app.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private username:string;
  userscore:Number;
  userid:string;
  downloadmenu:Boolean;
  registrationmenu: Boolean;

  constructor(private dataservice:DataService, 
    public authservice:AuthService,
    private router: Router, private appsettings: AppService) { 
      this.downloadmenu = appsettings.showDownloadPage;
      this.registrationmenu = appsettings.enableRegistration;
    }
  
  get Username(){
    this.username = `Üdv ${this.authservice.getUsername()}`;
    return this.username;
  }

  ngOnInit() {
    this.dataservice.scoreSubject.subscribe(
      x=>{
        this.userscore = x;
        console.log("Navigation score:"+this.userscore);
      }
    )
    console.log("Navigation bar OnInit");
    this.userid = this.authservice.getUserId();
  }

  logout(){
    console.log("Logout");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
