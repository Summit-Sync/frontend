import { TestBed } from '@angular/core/testing';

import { UpdateCourseValidatorService } from './update-course-validator.service';

describe('UpdateCourseValidatorService', () => {
  let service: UpdateCourseValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCourseValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
