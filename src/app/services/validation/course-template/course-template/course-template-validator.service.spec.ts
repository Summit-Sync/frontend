import { TestBed } from '@angular/core/testing';

import { CourseTemplateValidatorService } from './course-template-validator.service';

describe('CourseTemplateValidatorService', () => {
  let service: CourseTemplateValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTemplateValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
