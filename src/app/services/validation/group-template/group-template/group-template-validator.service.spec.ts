import { TestBed } from '@angular/core/testing';

import { GroupTemplateValidatorService } from './group-template-validator.service';

describe('GroupTemplateValidatorService', () => {
  let service: GroupTemplateValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTemplateValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
