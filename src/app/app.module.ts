import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './_services/auth.service';
import { DataService } from './_services/data.service';
import { ToolsService } from './_services/tools.service';
import { GuardService } from './_services/guard.service';
import { EditorGuardService } from './_services/editorguard.service';
import { AdminGuardService } from './_services/adminguard.service';
import { BetcartService } from './_services/betcart.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TeamComponent } from './team/team.component';
import { TeamItemComponent } from './team/team-item/team-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { contenteditableDirective } from './_directives/contenteditable.directive';
import { CouponComponent } from './coupon/coupon.component';
import { MatchComponent } from './match/match.component';
import { UsersComponent } from './dashboard/users/users.component';
import { TeamsgroupsComponent } from './dashboard/teamsgroups/teamsgroups.component';
import { ProfileComponent } from './profile/profile.component';
import { TimestampToDate } from './_pipes/timestampToDate';
import { sortPlayersByNum } from './_pipes/sortbynumber';
import { MatchesComponent } from './dashboard/matches/matches.component';
import { FinishmatchComponent } from './match/finishmatch/finishmatch.component';
import { ToplistComponent } from './toplist/toplist.component';
import { ToTeamName } from './_pipes/teamIDtoName';
import { BetcartComponent } from './betcart/betcart.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { GeneralModalComponent } from './modals/general-modal/general-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    TeamComponent,
    TeamItemComponent,
    DashboardComponent,
    contenteditableDirective,
    CouponComponent,
    MatchComponent,
    UsersComponent,
    TeamsgroupsComponent,
    ProfileComponent,
    TimestampToDate,
    sortPlayersByNum,
    ToTeamName,
    MatchesComponent,
    FinishmatchComponent,
    ToplistComponent,
    BetcartComponent,
    LogsComponent,
    GeneralModalComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    Ng2OrderModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    ToolsService,
    AuthService,
    GuardService,
    BetcartService,
    AdminGuardService,
    EditorGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
