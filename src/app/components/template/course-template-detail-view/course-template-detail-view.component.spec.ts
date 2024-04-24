import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTemplateDetailViewComponent } from './course-template-detail-view.component';

describe('CourseTemplateDetailViewComponent', () => {
  let component: CourseTemplateDetailViewComponent;
  let fixture: ComponentFixture<CourseTemplateDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseTemplateDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseTemplateDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
