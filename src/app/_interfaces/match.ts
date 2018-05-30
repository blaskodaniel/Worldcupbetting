import { Team } from "../_models/team.model";

export interface Match{
    _id:string,
    teamA:Team,
    teamB:Team,
    goalA:number,
    goalB:number,
    oddsAwin:number,
    oddsDraw:number,
    oddsBwin:number,
    date:string,
    type:string,
    active:number,
    comment:string,
    outcome?:String,
    externalID?:String,
    accordion?:boolean
}