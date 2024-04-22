import { TestBed } from '@angular/core/testing';

import { CourseTemplateService } from './courseTemplate.service';

describe('CoursetemplateService', () => {
  let service: CourseTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
