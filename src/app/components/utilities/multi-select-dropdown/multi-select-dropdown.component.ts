import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { CheckboxList } from '../../../models/CheckBoxList';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule, CheckItemInListPipe],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss',
})
export class MultiSelectDropdownComponent {
  @Input() allOptions: CheckboxList[];
  @Input() selectedOptions: CheckboxList[];
  @Input() dropdownHeadline: string;
  @Input() allowMultiple: boolean;
  showList: boolean = false;

  onCheckBoxClick(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    const clickedObject = this.allOptions[index];
    if(this.allowMultiple){
      checkbox.checked
        ? this.addObject(clickedObject)
        : this.deleteObject(clickedObject);
    }else{
      this.selectedOptions = [];
      this.addObject(clickedObject);
    }
  }

  deleteObject(clickedObject: CheckboxList) {
    var tqList = this.selectedOptions;
    tqList = tqList.filter((q) => {
      return q.id !== clickedObject.id;
    });
    this.selectedOptions = tqList;
  }

  addObject(clickedObject: CheckboxList) {
    this.selectedOptions.push(clickedObject);
  }

  dropDownClick() {
    this.showList = !this.showList;
  }
}
