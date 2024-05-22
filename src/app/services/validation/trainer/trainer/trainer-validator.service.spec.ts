import { TestBed } from '@angular/core/testing';

import { TrainerValidatorService } from './trainer-validator.service';

describe('TrainerValidatorService', () => {
  let service: TrainerValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
