import { TestBed } from '@angular/core/testing';

import { PostContactValidatorService } from './post-contact-validator.service';

describe('PostContactValidatorService', () => {
  let service: PostContactValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostContactValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
