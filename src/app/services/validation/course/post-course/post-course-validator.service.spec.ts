import { TestBed } from '@angular/core/testing';

import { PostCourseValidatorService } from './post-course-validator.service';

describe('PostCourseValidatorService', () => {
  let service: PostCourseValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCourseValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
