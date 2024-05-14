import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListComponent } from './components/final/course-list/course-list.component';
import {ToastComponent} from "./components/utilities/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    CourseListComponent,
    ToastComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Summit-Sync-Frontend';
}
