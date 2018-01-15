import { Injectable } from '@angular/core';
 
@Injectable()
export class ToolsService{
    
    constructor() { }

    decodeId(id,type,odds){
        return btoa(`${id}/${type}/${odds}`);
    }
    
    encodeId(code){
        let encString = atob(code);
        return encString.split("/");
    }
    
}
