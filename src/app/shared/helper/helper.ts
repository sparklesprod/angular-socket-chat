import * as moment from 'moment';

export class Helper {
  public static fromApiToTime(date: string) {
    return moment(date).isValid() ? moment(date).format('HH:mm') : null;
  }
}
