import { Pipe, PipeTransform } from '@angular/core';
import { CheckboxList } from '../../models/interfaces/CheckBoxList';

@Pipe({
  name: 'checkItemInList',
  standalone: true,
})
export class CheckItemInListPipe implements PipeTransform {
  transform<T extends CheckboxList>(
    qualification: T,
    inCourseQualificationList: T[]
  ): boolean {
    return inCourseQualificationList.some((q) => q.id === qualification.id);
  }
}
