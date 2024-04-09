import { TestBed } from '@angular/core/testing';

import { DateTimeMapperService } from './date-time-mapper.service';

describe('DateTimeMapperService', () => {
  let service: DateTimeMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
