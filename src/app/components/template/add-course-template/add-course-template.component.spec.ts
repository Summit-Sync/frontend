import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseTemplateComponent } from './add-course-template.component';

describe('AddCourseTemplateComponent', () => {
  let component: AddCourseTemplateComponent;
  let fixture: ComponentFixture<AddCourseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCourseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
