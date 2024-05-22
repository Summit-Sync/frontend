import { TestBed } from '@angular/core/testing';

import { PostGroupTemplateValidatorService } from './post-group-template-validator.service';

describe('PostGroupTemplateValidatorService', () => {
  let service: PostGroupTemplateValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostGroupTemplateValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
