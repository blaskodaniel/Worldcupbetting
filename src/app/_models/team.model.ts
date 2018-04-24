export class Team{
    _id?: String;
    groupid?:String;
    name?: String;
    flag?:String;
    win?:Number; // győzelem
    draw?:Number; // döntetlen
    loss?:Number; // vereség
    score?: Number;
    getgoal?:Number; //kapott gól
    kickgoal?: Number; //rúgott gól
    aktiv?: Number //játékban van-e még
}