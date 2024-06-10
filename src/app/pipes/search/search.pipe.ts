import {Pipe, PipeTransform} from '@angular/core';
import {CourseDTO} from '../../models/course/Course';
import {GroupDTO} from '../../models/group/Group';
import {FilterOption} from '../../models/enums/search';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(
    entry: CourseDTO | GroupDTO,
    selectedOption: FilterOption,
    condition: string,
    date1?: Date,
    date2?: Date
  ) {
    condition = condition.toLowerCase().trim();

    let wordsSpace = condition.indexOf(' ');
    let firstPart: string;
    let secondPart;
    if (wordsSpace != -1) {
      firstPart = condition.substring(0, wordsSpace);
      secondPart = condition.substring(wordsSpace + 1, condition.length);
    }

    switch (selectedOption) {
      case FilterOption.None:
        // Um standardmäßig die abgesagten Kurse und Gruppen auszublenden
        if ("courseNumber" in entry){
          return !(entry as CourseDTO).canceled;
        } else {
          return !(entry as GroupDTO).canceled;
        }
      // Kurs
      case FilterOption.CourseFinished:
        return (entry as CourseDTO).finished;
      case FilterOption.CourseCanceled:
        return (entry as CourseDTO).canceled;
      case FilterOption.CourseVisible:
        return (entry as CourseDTO).visible;
      case FilterOption.CourseAcronym:
        return (entry as CourseDTO).acronym.toLowerCase().includes(condition);
      // Gruppe
      case FilterOption.GroupFinished:
        return (entry as GroupDTO).finished;
      case FilterOption.GroupCanceled:
        return (entry as GroupDTO).canceled;
      case FilterOption.GroupAcronym:
        return (entry as GroupDTO).acronym.toLowerCase().includes(condition);
      // Allgemein
      case FilterOption.FreeTrainerSpots:
        if ("courseNumber" in entry) {
          return entry.trainers.length < (entry as CourseDTO).numberTrainers;
        } else {
          return entry.trainers.length < (entry as GroupDTO).numberParticipants / (entry as GroupDTO).participantsPerTrainer;
        }
      case FilterOption.FreeParticipantSpots:
        return (entry as CourseDTO).participants.length < entry.numberParticipants;
      case FilterOption.NoParticipants:
        return (entry as CourseDTO).participants.length === 0;
      case FilterOption.StartDate:
        if (!date1 || !date2) {
          return true;
        }
        let startDate = entry.dates[0];

        const target = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        );
        const start = new Date(date1);
        const end = new Date(date2);
        target.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        console.log(target, start, target == start);
        return target >= start && target <= end;
      case FilterOption.TrainerFullName:
        return (
          entry.trainers.filter((trainer) => {
            if (firstPart) {
              return (
                (trainer.lastName.toLowerCase().includes(firstPart) &&
                  trainer.firstName.toLowerCase().includes(secondPart!)) ||
                (trainer.lastName.toLowerCase().includes(secondPart!) &&
                  trainer.firstName.toLowerCase().includes(firstPart))
              );
            }
            return (
              trainer.lastName.toLowerCase().includes(condition) ||
              trainer.firstName.toLowerCase().includes(condition)
            );
          }).length > 0
        );
    }
  }
}
