import { TestBed } from '@angular/core/testing';

import { PostLocationValidatorService } from './post-location-validator.service';

describe('PostLocationValidatorService', () => {
  let service: PostLocationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostLocationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
