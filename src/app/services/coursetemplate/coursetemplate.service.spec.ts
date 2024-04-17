import { TestBed } from '@angular/core/testing';

import { CoursetemplateService } from './coursetemplate.service';

describe('CoursetemplateService', () => {
  let service: CoursetemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursetemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
