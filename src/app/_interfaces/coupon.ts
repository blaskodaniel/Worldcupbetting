import { Match } from "./match";
import { Team } from "../_models/team.model";
import { User } from "../_models/user.models";

export interface Coupon{
    _id?:string,
    userid:User,
    matchid:Match,
    username:String,
    teamA: Team,
    teamB: Team,
    bet:number,
    odds:number,
    result:Number,
    success?:Boolean,
    outcome:String,
    date?:String
}