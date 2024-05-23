import { TestBed } from '@angular/core/testing';

import { PostParticipantValidatorService } from './post-participant-validator.service';

describe('PostParticipantValidatorService', () => {
  let service: PostParticipantValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostParticipantValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
