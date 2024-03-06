import { Component } from '@angular/core';
import { Group } from '../../../models/Group';
import { Observable, of } from 'rxjs';
import { GroupService } from '../../../services/group/group.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css',
})
export class GroupListComponent {
  groups: Observable<Group[]> = of([]);

  constructor(public groupSerice: GroupService) {}

  ngOnInit(): void {
    this.groups = this.groupSerice.getAllGroups();
  }

  showDetails(group: Group) {}
  showEdit(group: Group) {}
  delete(group: Group) {}
}
