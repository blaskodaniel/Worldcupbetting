import { Team } from "./team.model";

export interface User{
    _id?: String,
    teamid?:Team,
    regdate?:String,
    username?: String,
    name: String,
    email?:String,
    password?: String,
    score:Number,
    avatar:String,
    aktiv?: Number,
    role?:String
}