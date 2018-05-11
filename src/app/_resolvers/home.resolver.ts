import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { DataService } from "../_services/data.service";
import { Match } from "../_interfaces/match";
import { ErrorHTTP } from "../_models/errorhttp.model";
import { Injectable } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class HomeResolver implements Resolve<any>{
    constructor(private dataservice: DataService, private authservice:AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log('HomeResolver működik..');
        return this.dataservice.getMatches("?active=0");
    }
}