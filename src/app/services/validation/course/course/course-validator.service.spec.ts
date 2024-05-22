import { TestBed } from '@angular/core/testing';

import { CourseValidatorService } from './course-validator.service';

describe('CourseValidatorService', () => {
  let service: CourseValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
