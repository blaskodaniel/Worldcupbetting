import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../_models/team.model';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-teamdata',
  templateUrl: './teamdata.component.html',
  styleUrls: ['./teamdata.component.css']
})
export class TeamdataComponent implements OnInit {
  currentTeam: Team;
  groupTeams: Team[];

  constructor(private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit() {
    let id = this.route.params.subscribe(x => {
      console.log("PARAM:" + x['id']);
      this.dataservice.getTeamById(x['id']).subscribe(
        (x: Team) => {
          this.currentTeam = x;
          console.log(JSON.stringify(x));
          this.getTeamsByGroup(x.groupid);
        }
      )
    });

  }

  getTeamsByGroup(groupID) {
    this.dataservice.getTeamsByGroup(groupID).subscribe(
      (x: Team[]) => {
        this.groupTeams = x.sort((a, b) => {
          if (a.score > b.score) return -1;
          else if (a.score < b.score) return 1;
          else if(a.getgoal > b.getgoal) return 1;
          else if(a.getgoal < b.getgoal) return -1;
          else return 0;
        });
      }
    )
  }

}
