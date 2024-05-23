import { TestBed } from '@angular/core/testing';

import { PostGroupValidatorService } from './post-group-validator.service';

describe('PostGroupValidatorService', () => {
  let service: PostGroupValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostGroupValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
