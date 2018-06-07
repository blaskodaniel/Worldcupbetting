import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'dateToTimestamp'})
export class DateToTimestamp implements PipeTransform {
    
    transform(value: string): string {
        var d = new Date(value)
        d.getTime()
        return d.getTime().toString();
  }
}