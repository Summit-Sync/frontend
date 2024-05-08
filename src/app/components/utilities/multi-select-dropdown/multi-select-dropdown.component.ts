import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule, CheckItemInListPipe],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss',
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() allOptions: CheckboxList[];
  @Input() selectedOptions: CheckboxList[];
  @Input() dropdownHeadline: string;
  @Input() allowMultiple: boolean;
  checkedBoxes: boolean[] = [];
  showList: boolean = false;

  ngOnInit(): void {
    this.allOptions.forEach((aOption) =>
      this.checkedBoxes.push(
        this.selectedOptions.some((sOption) => {
          return sOption.id == aOption.id;
        })
      )
    );
  }

  test(i: number) {
    console.log(i);
  }

  onCheckBoxClick(event: Event, index: number) {
    const checkbox = event.target as HTMLInputElement;
    const clickedObject = this.allOptions[index];
    if (this.allowMultiple) {
      checkbox.checked
        ? this.addObject(clickedObject)
        : this.deleteObject(clickedObject);
    } else {
      this.selectedOptions.length = 0;
      if (checkbox.checked) {
        this.addObject(clickedObject);
      }
      this.checkedBoxes.fill(false, 0, this.allOptions.length);
      this.checkedBoxes[index] = true;
      console.log(this.checkedBoxes);
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
