import { TestBed } from '@angular/core/testing';

import { StatusValidatorService } from './status-validator.service';

describe('StatusValidatorService', () => {
  let service: StatusValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
