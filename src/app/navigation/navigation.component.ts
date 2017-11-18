import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private dataservice:DataService, 
    public authservice:AuthService,
    private router: Router) { }

  ngOnInit() {
    
  }

  logout(){
    console.log("Logout");
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
