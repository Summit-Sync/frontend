import { TestBed } from '@angular/core/testing';

import { GroupValidatorService } from './group-validator.service';

describe('GroupValidatorService', () => {
  let service: GroupValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
