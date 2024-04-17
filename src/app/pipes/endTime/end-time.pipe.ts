import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'endTime',
  standalone: true,
})
export class EndTimePipe implements PipeTransform {
  transform(currentDate: Date, duration: number): string {
    let hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const totalMinutes = (currentDate.getMinutes() + minutes) % 60;
    if (currentDate.getMinutes() + minutes >= 60) {
      hours++;
    }
    let totalHours = (currentDate.getHours() + hours) % 24;
    return (
      totalHours.toString().padStart(2, '0') +
      ':' +
      totalMinutes.toString().padStart(2, '0')
    );
  }
}
