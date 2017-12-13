import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user;

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
  }

}
