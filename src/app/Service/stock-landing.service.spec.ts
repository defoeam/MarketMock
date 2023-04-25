import { TestBed } from '@angular/core/testing';

import { StockLandingService } from './stock-landing.service';

describe('StockLandingService', () => {
  let service: StockLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
