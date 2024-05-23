import { TestBed } from '@angular/core/testing';

import { UpdateGroupValidatorService } from './update-group-validator.service';

describe('UpdateGroupValidatorService', () => {
  let service: UpdateGroupValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateGroupValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
