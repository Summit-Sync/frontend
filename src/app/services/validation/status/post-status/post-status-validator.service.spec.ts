import { TestBed } from '@angular/core/testing';

import { PostStatusValidatorService } from './post-status-validator.service';

describe('PostStatusValidatorService', () => {
  let service: PostStatusValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostStatusValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
