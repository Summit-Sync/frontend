import { TestBed } from '@angular/core/testing';

import { ParticipantValidatorService } from './participant-validator.service';

describe('ParticipantValidatorService', () => {
  let service: ParticipantValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
