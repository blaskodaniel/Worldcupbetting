import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timestampToDate'})
export class TimestampToDate implements PipeTransform {
    
    transform(value: string,format?:string): string {
      moment.locale("hu");  
      if(format){
        // "MMM Do YY"
        return moment(parseInt(value)).format(format);
      }else{
        return moment(parseInt(value)).format("YYYY-MM-DD HH:mm:SS");
      }
    
  }
}