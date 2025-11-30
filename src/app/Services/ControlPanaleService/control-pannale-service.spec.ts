import { TestBed } from '@angular/core/testing';

import { ControlPannaleService } from './control-pannale-service';

describe('ControlPannaleService', () => {
  let service: ControlPannaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPannaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
