import { Team } from "./team.model";

export interface Match{
    teamA:Team,
    teamB:Team,
    goalA:Number,
    goalB:Number,
    oddsAwin:Number,
    oddsDraw:Number,
    oddsBwin:Number,
    date:String,
    type:String,
    location:String,
    active:Number,
    comment:String,
    blocked?:Boolean,
    matchoutcome?:String
}