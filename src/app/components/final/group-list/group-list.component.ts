import { Component } from '@angular/core';
import { GroupDTO } from '../../../models/group/Group';
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
  groups: Observable<GroupDTO[]> = of([]);

  constructor(public groupSerice: GroupService) {}

  ngOnInit(): void {
    this.groups = this.groupSerice.getAllGroups();
  }

  showDetails(group: GroupDTO) {}
  showEdit(group: GroupDTO) {}
  delete(group: GroupDTO) {}
}
