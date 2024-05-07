import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { CourseService } from '../../../services/course/course.service';
import { Observable, of } from 'rxjs';
import { Course } from '../../../models/course/Course';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../course/course.component';
import { MatDialog } from '@angular/material/dialog';
import { ShortCourseListComponent } from '../../template/short-course-list/short-course-list.component';
import { FilterOption } from '../../../models/enums/search';
import { SearchPipe } from '../../../pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CourseViewComponent } from '../course-view/course-view.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseComponent, SearchPipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: Observable<Course[]> = of([]);
  showingEdit: boolean = false;
  showingDelete: boolean = false;
  displayDropdown: boolean = false;
  dropdownContent: any;
  searchText: string = '';
  filterText: string = '';
  selectedOption: FilterOption = FilterOption.None;
  displayOption: FilterOption = FilterOption.None;
  filterOptions: FilterOption[] = [
    FilterOption.None,
    FilterOption.Trainer,
    FilterOption.Qualification,
    FilterOption.PriceValue,
    FilterOption.PriceName,
    FilterOption.Date,
    FilterOption.LocationStreet,
    FilterOption.LocationPostCode,
  ];

  constructor(
    public courseService: CourseService,
    private dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.courses = this.courseService.getAllCourses();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    this.dropdownContent = document.querySelectorAll('.dropdown-content');
    const btn = document.querySelectorAll('.dropbtn');
    const clickedInside = event.composedPath().includes(this.dropdownContent);
    if (!clickedInside && !btn && this.displayDropdown) {
      this.displayDropdown = false;
    }
  }

  optionClicked(filterOption: FilterOption) {
    this.displayOption = filterOption;
  }

  searchFilteredCourses() {
    this.selectedOption = this.displayOption;
  }

  showDetails(course: Course) {
    this.showingEdit = false;
    this.showCourseView(course);
  }

  showEdit(course: Course) {
    this.showingEdit = true;
    this.showEditCourse(course);
  }

  delete(course: Course) {
    this.showingDelete = true;
    this.showCourseView(course);
  }

  showTemplateList() {
    const dialogRef = this.dialog.open(ShortCourseListComponent, {
      disableClose: false,
      autoFocus: true,
      height: '80dvh',
      width: '40dvw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'confirm') {
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  showEditCourse(course: Course) {
    this.courseService.updateCourseDetails(course);
    const dialogRef = this.dialog.open(CourseComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept') {
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  showCourseView(course: Course) {
    this.courseService.updateCourseDetails(course);
    const dialogRef = this.dialog.open(CourseViewComponent, {
      disableClose: false,
      autoFocus: true,
      height: '90dvh',
      width: '70dvw',
    });

    let instance = dialogRef.componentInstance;
    instance.isDelete = this.showingDelete;

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'accept') {
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  hideCourse() {
    this.showingEdit = false;
    this.showingDelete = false;
  }

  // MatDialog on hold for now
  // openDialog() {
  //   this.dialog.open(CourseComponent, {
  //     height: '100%',
  //     width: '100%',
  //     position: { top: '50%', left: '50%' },
  //   });
  // }
}
