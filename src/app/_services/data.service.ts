import {Injectable, OnInit} from'@angular/core';
import {Http,Headers,Response, RequestOptionsArgs, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService{
    private options: RequestOptions;
    private headers: Headers;
    private noautheaders: Headers;
    private noauthoptions: RequestOptions;
    private Loged:boolean = false;
    private secretToken: string;
    private BaseURL:string = "http://beerlak.com";

    constructor(private http:Http, private httpclient:HttpClient){ 
        this.noautheaders = new Headers({ 'Content-Type': 'application/json' });
        this.noauthoptions = new RequestOptions({ headers: this.noautheaders });
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('x-access-token', localStorage.getItem('token'));
        this.options = new RequestOptions({ headers: this.headers });
    }

    login(email:string, password:string):Observable<boolean> {
        let data = {
            email:email,
            password:password
        };
        return this.http.post(`${this.BaseURL}/login`, data)
          .map(res => res.json())
          .do(
            data => {
                if(data.success){
                    localStorage.setItem('token', data.token);
                    this.secretToken = data.token;
                    return true;
                }else{
                    return data;
                }
                
            },
            error => {return false;}
          );
    }

    register(user) {
        console.log("Regisztráció:",user);
        return this.http.post(`${this.BaseURL}/register`, user);
    } 

    addGroup(group){
        return this.httpclient.post(`${this.BaseURL}/api/group/add`,group);
    }

    addTeam(team){
        return this.httpclient.post(`${this.BaseURL}/api/team/add`,team);
    }

    getUserById(id){
        // Get user by ID
    }

    getUsers() {
        // Get All user
        return this.httpclient.get(`${this.BaseURL}/api/alluser`);
    }

    getTeams() {
        // Get Teams
        return this.http.get(`${this.BaseURL}/getteams`,this.noauthoptions);
    }

    addUser(user){
        // Create user
        return this.httpclient.post(`${this.BaseURL}/api/adduser`,user);
    }

    addMatch(match){
        // Create match
        return this.httpclient.post(`${this.BaseURL}/api/addmatch`,match);
    }

    updateUser(user){
        // Update user by ID
        return this.httpclient.patch(`${this.BaseURL}/api/user/${user._id}`,user);
    }

    updateMatch(item){
        // Update match by ID
        return this.httpclient.patch(`${this.BaseURL}/api/match/${item._id}`,item);
    }

    deleteUser(user){
        // Delete user by ID
        return this.httpclient.delete(`${this.BaseURL}/api/user/${user._id}`,user);
    }

    updateTeam(team){
        // Update team by ID
        return this.httpclient.patch(`${this.BaseURL}/api/team/${team._id}`,team);
    }

    deleteTeam(team){
        // Delete team by ID
        return this.httpclient.delete(`${this.BaseURL}/api/team/${team._id}`,team);
    }

    getMatches() {
        // Get All user
        return this.http.get(`${this.BaseURL}/getmatches`);
    }

}