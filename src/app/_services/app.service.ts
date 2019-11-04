import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Team } from '../_models/team.model';
import { DataService } from './data.service';

@Injectable()
export class AppService {
  BaseURL: string = "https://mokasfoci.hu";
  clientSetting: any;
  favoritTeamFactor: number;
  wcwinnerplus: number;
  disabledTeamsSave: Boolean;
  showDownloadPage: Boolean;
  enableRegistration: Boolean;

  constructor(private http: Http) {}

  testDB(): Promise<any> {
    console.log("Database test...");

    let promise = new Promise((resolve, reject) => {
      this.http.get(`${this.BaseURL}/testdb`)
        .toPromise()
        .then(x => {
          let resp = x.json();
          if (resp.success === true) {
            console.log("Database:: [OK]");
            resolve();
          } else {
            console.log("Database:: !!ERROR!! => " + resp.msg);
            reject();
          }
        })
        .catch(err => {
          console.log("Database:: !!ERROR!! => " + err);
          reject();
        })
    });

    return promise
  }

  downloadSetting(): Promise<any> {
    console.log("Settings file download....");
    let promise = new Promise((resolve, reject) => {
      let Request = this.http.get(`${this.BaseURL}/downloadSetting`)
        .toPromise()
        .then(x => {
          let resp = x.json();
          this.clientSetting = resp;
          this.favoritTeamFactor = resp["favoritTeamFactor"] as number;
          this.wcwinnerplus = resp["wcwinnerplus"] as number;
          this.disabledTeamsSave = resp["disabledTeamsSave"] as Boolean;
          this.showDownloadPage = resp["showDownloadPage"] as Boolean;
          this.enableRegistration = resp["enableRegistration"] as Boolean;
          resolve()
        })
        .catch(err => {
          console.log("downloadSetting:: !!ERROR!! => " + err);
          reject();
        })
    });

    return promise;
  }

}
