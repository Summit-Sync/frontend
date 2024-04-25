import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../models/course/Course';
import { Group } from '../../models/group/Group';
import { FilterOption } from '../../models/enums/search';

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
    switch (selectedOption) {
      case FilterOption.None:
        return list;
      case FilterOption.Date:
        return;
      case FilterOption.LocationPostCode:
        return (list as Course).location.postCode.includes(condition);
      case FilterOption.LocationRoom:
        return (list as Course).location.room.includes(condition);
      case FilterOption.LocationStreet:
        return (list as Course).location.street.includes(condition);
      case FilterOption.PriceValue:
        return (list as Course).prices.filter((price) => {
          price.price = Number(condition);
        });
      case FilterOption.PriceName:
        return (list as Course).prices.filter((price) => {
          price.category.includes(condition);
        });
      case FilterOption.Qualification:
        return (list as Course).requiredQualifications.filter((q) => {
          q.name.includes(condition);
        });
      case FilterOption.Trainer:
        return list.trainers.filter((trainer) => {
          return trainer.lastName.includes(condition);
        }).length ? true : false;
    }
  }
}
