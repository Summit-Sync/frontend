import { TestBed } from '@angular/core/testing';

import { ContactValidatorService } from './contact-validator.service';

describe('ContactValidatorService', () => {
  let service: ContactValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
