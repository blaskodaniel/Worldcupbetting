import {Pipe, PipeTransform } from "@angular/core";
import { Team } from "../_models/team.model";

@Pipe({ 
    name: 'teamsByGroup',
    pure: false 
})
export class teamsByGroup implements PipeTransform {

    transform(array:Team[], args:String):Team[] {
        if (array==undefined || args==undefined) {
            return array;
        }
        return array.filter(item => item.groupid["_id"] == args);
        
    }

}