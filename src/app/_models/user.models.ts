import { Team } from "./team.model";
import { Groupwins } from "./groupwins.model";

export interface User {
    _id?: String,
    teamid?: Team,
    winteamid?: Team,
    groupA?: String,
    groupB?: String,
    groupC?: String,
    groupD?: String,
    groupE?: String,
    groupF?: String,
    groupG?: String,
    groupH?: String,
    regdate?: String,
    username?: String,
    name: String,
    email?: String,
    password?: String,
    score: Number,
    avatar: String,
    aktiv?: Number,
    role?: String
}