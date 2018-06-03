import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Match } from '../_interfaces/match';
import { User } from '../_models/user.models';
import { ErrorHTTP } from '../_models/errorhttp.model';
import { Coupon } from '../_interfaces/coupon';
import { ServerResponse } from '../_interfaces/serverResponse';
import { ExtAPIMatch } from '../_models/extapimatch';

@Injectable()
export class DataService {
    private options: RequestOptions;
    private headers: Headers;
    private noautheaders: Headers;
    private noauthoptions: RequestOptions;
    private Loged: boolean = false;
    private secretToken: string;
    private BaseURL: string = "http://beerlak.com";

    scoreSubject = new Subject<Number>();

    constructor(private http: Http, private httpclient: HttpClient) {
        this.noautheaders = new Headers({ 'Content-Type': 'application/json' });
        this.noauthoptions = new RequestOptions({ headers: this.noautheaders });
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('x-access-token', localStorage.getItem('token'));
        this.options = new RequestOptions({ headers: this.headers });
    }

    login(email: string, password: string): Observable<boolean> {
        let data = {
            email: email,
            password: password
        };
        return this.http.post(`${this.BaseURL}/login`, data)
            .map(res => res.json())
            .do(
                data => {
                    if (data.success) {
                        localStorage.setItem('token', data.token);
                        this.secretToken = data.token;
                        return true;
                    } else {
                        return data;
                    }

                },
                error => { return false; }
            );
    }

    register(user) {
        console.log("Regisztráció:", user);
        return this.http.post(`${this.BaseURL}/register`, user);
    }

    updateScore(score:Number){
        this.scoreSubject.next(score);
    }

    addGroup(group) {
        return this.httpclient.post(`${this.BaseURL}/api/groupadd`, group);
    }

    addTeam(team) {
        return this.httpclient.post(`${this.BaseURL}/api/addteam`, team);
    }

    getUserById(id) {
        // Get user by ID
        return this.httpclient.get(`${this.BaseURL}/api/getuserbyid/${id}`);
    }

    getUsers() {
        // Get All user
        return this.httpclient.get(`${this.BaseURL}/api/alluser`);
    }

    getLogs(page) {
        // Get logs
        return this.httpclient.post(`${this.BaseURL}/api/logs`, { page: page });
    }

    deleteLog(log) {
        // Delete log by ID
        return this.httpclient.delete(`${this.BaseURL}/api/logs/${log._id}`, log);
    }

    deleteLogAll(){
        // Delete all log
        return this.httpclient.delete(`${this.BaseURL}/api/logsalldelete`);
    }

    getGroups() {
        // Get All groups
        return this.http.get(`${this.BaseURL}/getgroups`);
    }

    getTeams() {
        // Get Teams
        return this.http.get(`${this.BaseURL}/getteams`, this.noauthoptions);
    }

    getTeamById(teamid) {
        // Get Team
        let obj = {};
        obj['teamid'] = teamid;
        return this.http.post(`${this.BaseURL}/getteambyid`, obj).map(x=>x.json());
    }

    getTeamsByGroup(groupid) {
        // Get Team
        let obj = {};
        obj['groupid'] = groupid;
        return this.http.post(`${this.BaseURL}/getTeamsByGroup`, obj).map(x=>x.json());
    }

    getPlayers() {
        // Get Players (name,score,avatar)
        return this.http.get(`${this.BaseURL}/getplayers`).map((x: Response) => x.json());
    }

    addUser(user) {
        // Create user
        return this.httpclient.post(`${this.BaseURL}/api/adduser`, user);
    }

    addMatch(match) {
        // Create match
        return this.httpclient.post(`${this.BaseURL}/api/addmatch`, match);
    }

    addCoupon(coupon) {
        // Create coupon
        return this.httpclient.post(`${this.BaseURL}/api/newcoupon`, coupon);
    }

    getAllCoupons(): Observable<Coupon[] | ErrorHTTP> {
        // Get all coupons
        return this.httpclient.get<Coupon[]>(`${this.BaseURL}/api/allcoupon`)
        .pipe(
            catchError(err=>this.errorHTTPHandler(err,11,"Hiba a couponok letöltése közben"))
        );
    }

    updateCoupon(coupon:Coupon):Observable<ServerResponse | ErrorHTTP>{
        return this.httpclient.patch(`${this.BaseURL}/api/coupon/${coupon._id}`, coupon)
        .pipe(
            catchError(err=>this.errorHTTPHandler(err,12,"Hiba a szelvény módosítása közben"))
        ).map(
            (x: ServerResponse) => x
        );
    }

    getCouponsByUserIs(userid) {
        // Get coupons by user id (http://beerlak.com/api/coupons/all/:id)
        return this.httpclient.get(`${this.BaseURL}/api/coupons/all/${userid}`);
    }

    removeCoupon(c) {
        // Remove coupon
        return this.httpclient.delete(`${this.BaseURL}/api/coupon/${c._id}`, c);
    }

    updateUser(user) {
        // Update user by ID
        return this.httpclient.patch(`${this.BaseURL}/api/user/${user._id}`, user);
    }

    updateMatch(item) {
        // Update match by ID
        return this.httpclient.patch(`${this.BaseURL}/api/match/${item._id}`, item);
    }

    deleteUser(user) {
        // Delete user by ID
        return this.httpclient.delete(`${this.BaseURL}/api/user/${user._id}`, user);
    }

    updateTeam(team) {
        // Update team by ID
        return this.httpclient.patch(`${this.BaseURL}/api/team/${team._id}`, team);
    }

    updateGroup(group) {
        // Update group by ID
        return this.httpclient.patch(`${this.BaseURL}/api/group/${group._id}`, group);
    }

    saveProfil(userid:String,fullname:String,username:String,teamid:String){
        // Save user's profile
        return this.httpclient.patch(`${this.BaseURL}/api/profil/${userid}`, {name:fullname,username:username,teamid:teamid});
    }

    deleteTeam(team) {
        // Delete team by ID
        return this.httpclient.delete(`${this.BaseURL}/api/team/${team._id}`, team);
    }

    deleteGroup(group) {
        // Delete group by ID
        return this.httpclient.delete(`${this.BaseURL}/api/group/${group._id}`, group);
    }

    deleteMatch(match) {
        // Delete match by ID
        return this.httpclient.delete(`${this.BaseURL}/api/match/${match._id}`, match);
    }

    getMatches(query): Observable<Match[] | ErrorHTTP> {
        // Get All match
        return this.http.get(`${this.BaseURL}/getmatches${query}`)
            .pipe(
                catchError(err => this.errorHTTPHandler(err, 10, "Hiba a mérkőzések letöltése közben")))
            .map(
                (x: Response) => x.json()
            );
    }

    getExtAPIMatches(query): Observable<ExtAPIMatch[] | ErrorHTTP> {
        // Import matches and odds from external API (https://api.the-odds-api.com)
        return this.httpclient.get(`${this.BaseURL}/api/getextAPImatches${query}`)
            .pipe(
                catchError(err => this.errorHTTPHandler(err, 13, "Hiba a mérkőzések letöltése közben")))
            .map(
                (x: ExtAPIMatch[]) => x
            );
    }

    // Import Odds
    importExternalMatches(){
        return this.httpclient.get(`${this.BaseURL}/api/importapi`);
    }

    // Refresh odds
    refreshOdds(){
        return this.httpclient.get(`${this.BaseURL}/api/refreshodds`);
    }

    attachMatchToGame(externalmatch:ExtAPIMatch, match:Match){
        return this.httpclient.post(`${this.BaseURL}/api/attachmatch`,{externalmatch:externalmatch,match:match})
        .pipe(catchError(err => this.errorHTTPHandler(err, 10, "[attachMatchToGame] Hiba")))
        .map((x:Response)=>x);
    }

    // Error handler function
    private errorHTTPHandler(error: HttpErrorResponse, errornumber: number, msg: string): Observable<ErrorHTTP> {
        let httperror = new ErrorHTTP();
        httperror.errornumber = errornumber;
        httperror.message = error.statusText;
        httperror.uimessage = msg;
        return ErrorObservable.create(httperror);
    }

}