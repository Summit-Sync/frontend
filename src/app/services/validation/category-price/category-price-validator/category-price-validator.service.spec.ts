import { TestBed } from '@angular/core/testing';

import { CategoryPriceValidatorService } from './category-price-validator.service';

describe('CategoryPriceValidatorService', () => {
  let service: CategoryPriceValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryPriceValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
