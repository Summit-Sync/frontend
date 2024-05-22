import { TestBed } from '@angular/core/testing';

import { QualificationValidatorService } from './qualification-validator.service';

describe('QualificationValidatorService', () => {
  let service: QualificationValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualificationValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
