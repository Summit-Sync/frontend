import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListComponent } from './components/final/course-list/course-list.component';
import { ToastComponent } from './components/utilities/toast/toast.component';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { CourseService } from './services/course/course.service';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    CourseListComponent,
    ToastComponent,
    NavigationBarComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'Summit-Sync';

  constructor(
    private courseService: CourseService,
    private loginService: LoginService,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.loginService.doLogin().subscribe();
  }
}
