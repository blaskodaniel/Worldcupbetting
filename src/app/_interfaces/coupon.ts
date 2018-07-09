import { Match } from '../_interfaces/match';
import { Team } from "../_models/team.model";
import { User } from "../_models/user.models";
import { CouponExtend } from './couponExtend';

export interface Coupon extends CouponExtend{
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
    date?:String,
    favoriteTeam?:Boolean,
    win?:number
}