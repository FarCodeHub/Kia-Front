import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';
@Pipe({
    name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value != null) {
            let MomentDate = moment(value, 'YYYY/MM/DD HH:mm ');
            return MomentDate.locale('fa').format('HH:mm YYYY/M/D');
        }
        else
            return "";

    }
}
