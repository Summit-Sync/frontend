import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConverterService {
  constructor() {}

  getDate(cd: Date): string {
    return cd.getDate() + '.' + cd.getMonth() + '.' + cd.getFullYear();
  }

  getStartTime(cd: Date): string {
    return (
      cd.getHours().toString().padStart(2, '0') +
      ':' +
      cd.getMinutes().toString().padStart(2, '0')
    );
  }

  getEndTime(cd: Date, duration: number | undefined): string {
    if (duration == undefined) {
      return 'N/A';
    }
    return (
      (cd.getHours() + duration).toString().padStart(2, '0') +
      ':' +
      cd.getMinutes().toString().padStart(2, '0')
    );
  }
}
