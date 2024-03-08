import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListComponent } from './components/final/course-list/course-list.component';
import { CourseTemplateComponent } from './components/template/course-template/course-template.component';
import { GroupListComponent } from './components/final/group-list/group-list.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    CourseTemplateComponent,
    CourseListComponent,
    GroupListComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Summit-Sync-Frontend';
}
