import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckItemInListPipe } from '../../../pipes/checkbox/check-item-in-list.pipe';
import { listItem } from '../../../models/listItem';

@Component({
  selector: 'app-multi-select-dropdown',
  standalone: true,
  imports: [CommonModule, CheckItemInListPipe],
  templateUrl: './multi-select-dropdown.component.html',
  styleUrl: './multi-select-dropdown.component.css',
})
export class MultiSelectDropdownComponent {
  @Output() CheckBoxClick: EventEmitter<{ event: InputEvent; id: number }> =
    new EventEmitter();
  @Input() allOptions: listItem[];
  @Input() selectedOptions: listItem[];
  showList: boolean = false;
  emitCheckBoxClick(event: any, id: number) {
    // Emit an object containing both the event and the index
    this.CheckBoxClick.emit({ event, id });
  }
  dropDownClick() {}
}
