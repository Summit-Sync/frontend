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
    list: CourseDTO | GroupDTO,
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
        if ("courseNumber" in list){
          return !(list as CourseDTO).canceled;
        } else {
          return !(list as GroupDTO).canceled;
        }
      // Kurs
      case FilterOption.CourseFinished:
        return (list as CourseDTO).finished;
      case FilterOption.CourseCanceled:
        return (list as CourseDTO).canceled;
      case FilterOption.CourseVisible:
        return (list as CourseDTO).visible;
      case FilterOption.CourseAcronym:
        return (list as CourseDTO).acronym.toLowerCase().includes(condition);
      // Gruppe
      case FilterOption.GroupFinished:
        return (list as GroupDTO).finished;
      case FilterOption.GroupCanceled:
        return (list as GroupDTO).canceled;
      case FilterOption.GroupAcronym:
        return (list as GroupDTO).acronym.toLowerCase().includes(condition);
      // Allgemein
      case FilterOption.FreeTrainerSpots:
        if ("courseNumber" in list) {
          return list.trainers.length < (list as CourseDTO).numberTrainers;
        } else {
          return list.trainers.length < (list as GroupDTO).numberParticipants / (list as GroupDTO).participantsPerTrainer;
        }
      case FilterOption.FreeParticipantSpots:
        return (list as CourseDTO).participants.length < list.numberParticipants;
      case FilterOption.NoParticipants:
        return (list as CourseDTO).participants.length === 0;
      case FilterOption.StartDate:
        if (!date1 || !date2) {
          return true;
        }
        let startDate = list.dates[0];

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
          list.trainers.filter((trainer) => {
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
