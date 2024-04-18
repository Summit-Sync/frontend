import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortCourseListComponent } from './short-course-list.component';

describe('ShortCourseListComponent', () => {
  let component: ShortCourseListComponent;
  let fixture: ComponentFixture<ShortCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortCourseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
