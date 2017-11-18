import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './_services/guard.service';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TeamComponent} from './team/team.component';
import {TeamItemComponent} from './team/team-item/team-item.component';

const appRoutes:Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'team', component:TeamComponent, canActivate:[GuardService], children:[
        {path:':id',component:TeamItemComponent}
    ]},
    {path:'dashboard', component:DashboardComponent, canActivate:[GuardService]},
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}