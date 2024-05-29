import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeMapperService {
  mappedDateTime: string[][] = [];
  mapDateToStartTimeString(hours: number, minutes: number) {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  mapDateToEndTimeString(hours: number, minutes: number, duration: number) {
    let endHours = Math.floor(duration / 60);
    const endMinutes = duration % 60;
    const totalMinutes = (minutes + endMinutes) % 60;
    if (minutes + endMinutes >= 60) {
      endHours++;
    }
    let totalHours = (hours + endHours) % 24;
    return (
      totalHours.toString().padStart(2, '0') +
      ':' +
      totalMinutes.toString().padStart(2, '0')
    );
  }

  mapHoursToDateHours(hours: number) {
    return hours % 24;
  }

  convertMilisecondsToFullHours(timeMS: number): number {
    return Math.floor((timeMS / 3600000) % 24);
  }

  convertMinutesToMiliseconds(minutes: number): number {
    return minutes * 60 * 1000;
  }

  calculateMinutesRemainder(timeMS: number): number {
    return (timeMS % 3600000) / 60000;
  }

  mapDateTime(duration: number, dates: Date[], mappedDT: string[][]) {
    this.mappedDateTime = mappedDT;
    dates.forEach((date, index) => {
      this.mappedDateTime[index] = [];
      this.mappedDateTime[index][0] =
        this.mapDateToStartTimeString(
          date.getHours(),
          date.getMinutes()
        );
      this.mappedDateTime[index][1] =
        this.mapDateToEndTimeString(
          date.getHours(),
          date.getMinutes(),
          duration
        );
    });
  }

  addDate( duration: number, dates: Date[], mappedDT: string[][]): Date[] {
    this.mappedDateTime = mappedDT;
    let datesLength = dates.length;
    this.mappedDateTime[datesLength] = [];
    this.mappedDateTime[datesLength].push(
      '12:00',
      this.mapDateToEndTimeString(
        12,
        0,
        duration
      )
    );
    const addedDate = new Date();
    addedDate.setHours(12);
    addedDate.setMinutes(0);
    dates.push(addedDate);
    return dates;
  }

  deleteDate(index: number, dates: Date[], mappedDT: string[][]): Date[] {
    this.mappedDateTime = mappedDT;
    dates.splice(index, 1);
    this.mappedDateTime.splice(index, 1);
    return dates;
  }

  onDateChange(event: Event, index: number, dates: Date[], mappedDT: string[][]) {
    this.mappedDateTime = mappedDT;
    const inputElement = event.target as HTMLInputElement;
    const newDate = inputElement.valueAsDate;
    if (newDate) {
      dates[index] = newDate;
    }
    return dates;
  }

  onStartTimeChange(event: Event, index: number, duration: number, dates: Date[], mappedDT: string[][]) {
    this.mappedDateTime = mappedDT;
    const inputElement = event.target as HTMLInputElement;
    const timeMS = inputElement.valueAsNumber;
    const hours = this.convertMilisecondsToFullHours(timeMS);
    const minutes = this.calculateMinutesRemainder(timeMS);
    dates[index].setHours(hours);
    dates[index].setMinutes(minutes);

    this.mappedDateTime[index][0] =
      this.mapDateToStartTimeString(hours, minutes);
    this.mappedDateTime[index][1] = this.mapDateToEndTimeString(
      hours,
      minutes,
      duration
    );
    return dates;
  }
}
