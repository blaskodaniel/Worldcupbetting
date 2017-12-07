import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'timestampToDate'})
export class TimestampToDate implements PipeTransform {
    
    transform(value: string): string {
    return moment(parseInt(value)).format("YYYY-MM-DD HH:mm:SS");
  }
}