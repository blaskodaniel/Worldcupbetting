import { Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toTeamName'})
export class ToTeamName implements PipeTransform {
  teams:any

  transform(value: string): string {
    //let team = this.teams.filter(team => value === team._id);
    return "Teszt";
  }
}
