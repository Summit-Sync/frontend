import { TestBed } from '@angular/core/testing';

import { PostTrainerValidatorService } from './post-trainer-validator.service';

describe('PostTrainerValidatorService', () => {
  let service: PostTrainerValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostTrainerValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
