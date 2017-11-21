import { contenteditableDirective } from '../../_directives/contenteditable.directive';
import { DataService } from '../../_services/data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  userSearch:string;
  userOrderKey: string = 'regdate';
  userOrderReverse: boolean = true;

  constructor(private dataservice:DataService,public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getusers();
  }

  getusers(){
    this.dataservice.getUsers().subscribe(
      (response)=>{
        console.log(response);
        this.users = response;
      },
      (error)=>console.log(error)
    )
  }

  EditUser(user){
    console.log(user);
    this.dataservice.updateUser(user).subscribe(
      (x)=>{
        this.toastr.success('Sikeres mentés!', 'Üzenet',{positionClass:"toast-bottom-left"});
      }
    )
  }

  DeleteUser(user){
    console.log(user);
    this.dataservice.deleteUser(user).subscribe(
      (x)=>{
        this.toastr.success('Sikeres Törlés!', 'Üzenet');
        this.getusers();
      }
    )
  }

}
