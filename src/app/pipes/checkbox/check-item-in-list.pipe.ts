import { Pipe, PipeTransform } from '@angular/core';
import { listItem } from '../../models/listItem';

@Pipe({
  name: 'checkItemInList',
  standalone: true,
})
export class CheckItemInListPipe implements PipeTransform {
  transform<T extends listItem>(
    qualification: T,
    inCourseQualificationList: T[]
  ): boolean {
    return inCourseQualificationList.some((q) => q.id === qualification.id);
  }
}
