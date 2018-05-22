import { ProfileComponent } from './profile/profile.component';
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
import { MatchesComponent } from './dashboard/matches/matches.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { CouponsComponent } from './dashboard/coupons/coupons.component';
import { ExternalApiComponent } from './dashboard/external-api/external-api.component';
import { HomeResolver } from './_resolvers/home.resolver';
import { PlayedmatchesComponent } from './playedmatches/playedmatches.component';
import { MycouponsComponent } from './mycoupons/mycoupons.component';
import { TeamdataComponent } from './teamdata/teamdata.component';

const appRoutes:Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:HomeComponent, resolve:{matches:HomeResolver}},
    {path:'playedmatch', component:PlayedmatchesComponent},
    {path:'team/:id', component:TeamdataComponent},
    {path:'profile',component:ProfileComponent, canActivate:[GuardService]},
    {path:'mycoupons',component:MycouponsComponent, canActivate:[GuardService]},
    {path:'users', component:UsersComponent, canActivate:[GuardService,AdminGuardService]},
    {path:'teamsgroups', component:TeamsgroupsComponent, canActivate:[GuardService,EditorGuardService]},
    {path:'admincoupons', component:CouponsComponent, canActivate:[GuardService,EditorGuardService]},
    {path:'extarnalAPI', component:ExternalApiComponent, canActivate:[GuardService,EditorGuardService]},
    {path:'logs', component:LogsComponent, canActivate:[GuardService,AdminGuardService]},
    {path:'matches', component:MatchesComponent,canActivate:[GuardService,EditorGuardService]},
    {path:'registration', component:RegistrationComponent},
    {path:'login', component:LoginComponent},
    {path:"**",component:HomeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{
}