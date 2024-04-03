import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endTime',
  standalone: true,
})
export class EndTimePipe implements PipeTransform {
  transform(currentDate: Date, duration: number): string {

    return (
      (currentDate.getHours() + duration).toString().padStart(2, '0') +
      ':' +
      currentDate.getMinutes().toString().padStart(2, '0')
    );
  }
}
