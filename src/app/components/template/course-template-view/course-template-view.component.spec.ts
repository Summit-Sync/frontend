import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplateViewComponent } from './course-template-view.component';

describe('CourseTemplateViewComponent', () => {
  let component: CourseTemplateViewComponent;
  let fixture: ComponentFixture<CourseTemplateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTemplateViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseTemplateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
