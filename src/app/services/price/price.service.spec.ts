import { TestBed } from '@angular/core/testing';

import { CategoryPriceService } from './price.service';

describe('PriceService', () => {
  let service: CategoryPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
