import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course/Course';
import { Group } from '../../models/group/Group';
import { FilterOption } from '../../models/enums/search';
import { cond } from 'lodash';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(
    list: Course | Group,
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
        return true;
      case FilterOption.CourseAcronym:
        return (list as Course).acronym.toLowerCase().includes(condition);
      case FilterOption.FreeTrainerSpots:
        return list.trainers.length < (list as Course).numberTrainers;
      case FilterOption.FreeParticipantSpots:
        return (list as Course).participants.length < list.numberParticipants;
      case FilterOption.NoParticipants:
        return (list as Course).participants.length === 0;
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
