import { TestBed } from '@angular/core/testing';

import { PostCourseTemplateValidatorService } from './post-course-template-validator.service';

describe('PostCourseTemplateValidatorService', () => {
  let service: PostCourseTemplateValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCourseTemplateValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
