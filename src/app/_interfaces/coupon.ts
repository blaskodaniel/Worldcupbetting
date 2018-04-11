export interface Coupon{
    _id?:string,
    userid:String,
    matchid:Number,
    username:String,
    teamA: Number,
    teamB: Number,
    bet:Number,
    odds:Number,
    result:Number,
    success?:Boolean,
    outcome:String,
    date?:String
}