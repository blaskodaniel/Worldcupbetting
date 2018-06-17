import {Pipe, PipeTransform } from "@angular/core";
import { User } from "../_models/user.models";

@Pipe({ name: 'sortPlayersByNum' })
export class sortPlayersByNum implements PipeTransform {

    transform(array:Array<User>, args:String):Array<User> {
        if(array != undefined){
            array.sort((a:User, b:User)=>{
                if(a.nettoscore > b.nettoscore){
                    return -1;
                }else if(a.nettoscore < b.nettoscore){
                    return 1;
                }else{
                    return 0;
                }
            });
            return array;
        }
        
    }

}