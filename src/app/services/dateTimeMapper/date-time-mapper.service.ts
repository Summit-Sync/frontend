import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeMapperService {
  mapDateToStartTimeString(hours: number, minutes: number) {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  mapDateToEndTimeString(hours: number, minutes: number, duration: number) {
    let endHours = Math.floor(duration / 60);
    const endMinutes = duration % 60;
    const totalMinutes = (minutes + endMinutes) % 60;
    console.log(minutes + endMinutes, minutes, endMinutes);
    if (minutes + endMinutes >= 60) {
      endHours++;
    }
    let totalHours = (hours + endHours) % 24;
    return (
      totalHours.toString().padStart(2, '0') +
      ':' +
      totalMinutes.toString().padStart(2, '0')
    );

    const durationMinutes = (duration + minutes) % 60;
    const durationHours = Math.floor(duration / 60) + hours;
    const formattedHours = String(durationHours).padStart(2, '0');
    const formattedMinutes = String(durationMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
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
}
