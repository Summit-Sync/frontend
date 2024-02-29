import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CourseTemplateComponent} from "./components/template/course-template/course-template.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CourseTemplateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Summit-Sync-Frontend';
}
