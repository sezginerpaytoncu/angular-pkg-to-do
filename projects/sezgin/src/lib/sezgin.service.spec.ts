import { TestBed } from '@angular/core/testing';

import { SezginService } from './sezgin.service';

describe('SezginService', () => {
  let service: SezginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SezginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
