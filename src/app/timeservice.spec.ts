import { TestBed } from '@angular/core/testing';

import { Timeservice } from './timeservice';

describe('Timeservice', () => {
  let service: Timeservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Timeservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
