import { TestBed } from '@angular/core/testing';

import { PostQualificationValidatorService } from './post-qualification-validator.service';

describe('PostQualificationValidatorService', () => {
  let service: PostQualificationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostQualificationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
