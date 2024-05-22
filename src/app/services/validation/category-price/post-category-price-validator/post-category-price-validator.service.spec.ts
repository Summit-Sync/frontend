import { TestBed } from '@angular/core/testing';

import { PostCategoryPriceValidatorService } from './post-category-price-validator.service';

describe('PostCategoryPriceValidatorService', () => {
  let service: PostCategoryPriceValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCategoryPriceValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
