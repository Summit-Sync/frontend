import { TestBed } from '@angular/core/testing';

import { ParticipantListServiceService } from './participant-list-service.service';

describe('ParticipantListServiceService', () => {
  let service: ParticipantListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
