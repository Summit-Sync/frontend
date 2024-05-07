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
    condition: string
  ) {
    condition = condition.toLowerCase();
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
        let startDate = list.dates[0];
        let startDay = startDate.getDate().toString();
        let startMonthNum = startDate.getMonth() + 1;
        let startMonth = startMonthNum.toString();
        return startDay.includes(condition) || startMonth.includes(condition);
      case FilterOption.TrainerFullName:
        return (
          list.trainers.filter((trainer) => {
            console.log(
              trainer.lastName.toLowerCase().includes(condition) ||
                trainer.firstName.toLowerCase().includes(condition)
            );
            return (
              trainer.lastName.toLowerCase().includes(condition) ||
              trainer.firstName.toLowerCase().includes(condition)
            );
          }).length > 0
        );
    }
  }
}
