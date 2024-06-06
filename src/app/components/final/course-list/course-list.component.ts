import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {CourseService} from '../../../services/course/course.service';
import {CourseDTO} from '../../../models/course/Course';
import {CommonModule} from '@angular/common';
import {CourseComponent} from '../course/course.component';
import {MatDialog} from '@angular/material/dialog';
import {ShortCourseListComponent} from '../../template/short-course-list/short-course-list.component';
import {FilterOption} from '../../../models/enums/search';
import {SearchPipe} from '../../../pipes/search/search.pipe';
import {FormsModule} from '@angular/forms';
import {CourseViewComponent} from '../course-view/course-view.component';
import {ToastService} from '../../../services/toast/toast.service';
import {ConfirmationDialogComponent} from '../../../dialog/confirmation-dialog/confirmation-dialog.component';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseComponent, SearchPipe],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent implements OnInit {
  courses: CourseDTO[] = [];
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
    FilterOption.CourseCanceled,
    FilterOption.CourseFinished,
    FilterOption.CourseVisible,
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

  showDetails(course: CourseDTO) {
    this.showingEdit = false;
    this.showCourseView(course);
  }

  showEdit(course: CourseDTO) {
    this.showingEdit = true;
    this.showEditCourse(course);
  }

  delete(course: CourseDTO) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false,
      autoFocus: true,
      height: '40dvh',
      width: '30dvw',
      data: {
        name: course.title,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method === 'confirm') {
        this.courseService
          .deleteCourse(course.id)
          .pipe(finalize(() => this.updateList()))
          .subscribe({
            next: (response) => {
              this.toast.showSuccessToast('Vorlage erfolgreich gelöscht');
            },
            error: (error) => {
              this.toast.showErrorToast('Löschen der Vorlage fehlgeschlagen \n' + error.error.error);
            },
          });
      }
    });
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
      if (obj.method == 'created') {
        this.updateList();
        console.log('Dialog output:', obj.data);
        // Validate Input
        //
      }
    });
  }

  showEditCourse(course: CourseDTO) {
    console.log('showEdit', course);
    this.courseService.updateCurrentCourse(course);
    const dialogRef = this.dialog.open(CourseComponent, {
      disableClose: true,
      autoFocus: true,
      height: '90dvh',
      width: '1075px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      const obj = JSON.parse(result);
      if (obj.method == 'updated') {
        console.log('Dialog output:', obj.data);
        this.updateList();

        // Validate Input
        //
      }
    });
  }

  showCourseView(course: CourseDTO) {
    this.courseService.updateCurrentCourse(course);
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
      if (obj.method == 'delete') {
        this.courseService.deleteCourse(obj.data.id).subscribe({
          next: () =>{
            this.toast.showSuccessToast("Kurs erfolgreich gelöscht");
          },
          error: (error) =>{
            this.toast.showErrorToast("Kurs löschen fehlgeschlagen \n" + error.error.error);
          }
         });
      }
    });
  }

  updateList() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;

      // Iterate over courses and convert dates to Date objects
      this.courses.forEach((course) => {
        course.dates = course.dates.map((dateStr) => new Date(dateStr));
      });

      console.log('updateList: ', this.courses); // Log updated courses with Date objects
    });
  }

  cancelCourse(course: CourseDTO) {
    this.courseService.putCourseCancel(course.id, !course.canceled).subscribe({
      next: () => {
        this.toast.showSuccessToast('Kurs erfolgreich abgesagt');
        this.updateList();
      },
      error: (error) => {
        this.toast.showErrorToast('Kurs absagen fehlgeschlagen \n' + error.error.error);
      },
    });
  }
}
