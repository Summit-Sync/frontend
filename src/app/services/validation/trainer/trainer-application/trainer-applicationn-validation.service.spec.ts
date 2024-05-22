import { TestBed } from '@angular/core/testing';

import { TrainerApplicationnValidationService } from './trainer-applicationn-validation.service';

describe('TrainerApplicationnValidationService', () => {
  let service: TrainerApplicationnValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerApplicationnValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
