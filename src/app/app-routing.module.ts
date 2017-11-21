import { TeamsgroupsComponent } from './dashboard/teamsgroups/teamsgroups.component';
import { UsersComponent } from './dashboard/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './_services/guard.service';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TeamComponent} from './team/team.component';
import {TeamItemComponent} from './team/team-item/team-item.component';
import { AdminGuardService } from './_services/adminguard.service';
import { EditorGuardService } from './_services/editorguard.service';

const appRoutes:Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'users', component:UsersComponent, canActivate:[GuardService,AdminGuardService]},
    {path:'teamsgroups', component:TeamsgroupsComponent, canActivate:[GuardService,EditorGuardService]},
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{

}