import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseComponent, SearchPipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  showingEdit: boolean = false;
  showingDelete: boolean = false;
  displayDropdown: boolean = false;
  dropdownContent: any;
  searchText: string = '';
  searchDate?: Date;
  searchEndDate?: Date;
  displayOption: FilterOption = FilterOption.None;
  filterOptions: FilterOption[] = [
    FilterOption.None,
    FilterOption.CourseAcronym,
    FilterOption.FreeTrainerSpots,
    FilterOption.FreeParticipantSpots,
    FilterOption.NoParticipants,
    FilterOption.StartDate,
    FilterOption.TrainerFullName,
  ];
  FilterOption = FilterOption;

  constructor(
    public courseService: CourseService,
    private dialog: MatDialog,
    private toast: ToastService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.updateList();
    console.log(this.courses);
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

  // searchFilteredCourses() {
  //   this.selectedOption = this.displayOption;
  // }

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
    //?? TODO: Updaten bevor der Kursdialog abgeschlossen wurde?
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
        //TODO: Muss in das next() event des Update calls
        this.toast.showSuccessToast('Kurs wurde erfolgreich aktualisiert');
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
      this.updateList();
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

  updateList() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;

      // Iterate over courses and convert dates to Date objects
      this.courses.forEach((course) => {
        course.dates = course.dates.map((dateStr) => new Date(dateStr));
      });

      console.log(this.courses); // Log updated courses with Date objects
    });
  }

  // MatDialog on hold for now
  // openDialog() {
  //   this.dialog.open(CourseComponent, {
  //     height: '100%',
  //     width: '100%',
  //     position: { top: '50%', left: '50%' },
  //   });
  // }

  cancelCourse(course: Course) {
    this.courseService.putCourseCancel(course.id, !course.canceled);
  }
}
