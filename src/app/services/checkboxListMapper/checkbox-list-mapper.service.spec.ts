import { TestBed } from '@angular/core/testing';

import { CheckboxListMapperService } from './checkbox-list-mapper.service';

describe('CheckboxListMapperService', () => {
  let service: CheckboxListMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxListMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
