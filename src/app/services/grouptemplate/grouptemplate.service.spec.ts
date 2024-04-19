import { TestBed } from '@angular/core/testing';

import { GrouptemplateService } from './grouptemplate.service';

describe('GrouptemplateService', () => {
  let service: GrouptemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrouptemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
