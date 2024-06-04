import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { CheckboxList } from '../../../models/interfaces/CheckBoxList';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule, CheckItemInListPipe],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.scss',
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges {
  @Input() allOptions: CheckboxList[];
  @Input() selectedOptions: CheckboxList[];
  @Input() dropdownHeadline: string;
  @Input() allowMultiple: boolean;
  @Input() allowedEntries: number = 999999999999999;
  @Output() changeEvent: EventEmitter<CheckboxList[]> = new EventEmitter<
    CheckboxList[]
  >();

  checkedBoxes: boolean[] = [];
  showList: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: PointerEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
      return;
    } else {
      this.showList = false;
    }
  }

  constructor(private eRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.allOptions);
    this.allOptions.forEach((aOption) =>
      this.checkedBoxes.push(
        this.selectedOptions.some((sOption) => {
          return sOption.id == aOption.id;
        })
      )
    );
  }

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
      if (
        this.allowedEntries > this.selectedOptions.length ||
        !checkbox.checked
      ) {
        checkbox.checked
          ? this.addObject(clickedObject)
          : this.deleteObject(clickedObject);
      } else {
        checkbox.checked = false;
      }
    } else {
      this.selectedOptions.length = 0;
      if (checkbox.checked) {
        this.addObject(clickedObject);
      }
      this.checkedBoxes.fill(false, 0, this.allOptions.length);
      this.checkedBoxes[index] = true;
    }
    this.changeEvent.emit(this.selectedOptions);
  }

  deleteObject(clickedObject: CheckboxList) {
    let tqList = this.selectedOptions;
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
