import { TestBed } from '@angular/core/testing';

import { LocationValidatorService } from './location-validator.service';

describe('LocationValidatorService', () => {
  let service: LocationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
