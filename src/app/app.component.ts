import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListComponent } from './components/final/course-list/course-list.component';
import {ToastComponent} from "./components/utilities/toast/toast.component";
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { CourseService } from './services/course/course.service';

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
export class AppComponent implements OnInit {
  title = 'Summit-Sync-Frontend';

  constructor(private courseService: CourseService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.doLogin().subscribe();
  }
}
