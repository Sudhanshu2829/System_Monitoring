import { TestBed } from '@angular/core/testing';

import { CpudataService } from './cpudata.service';

describe('CpudataService', () => {
  let service: CpudataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpudataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
