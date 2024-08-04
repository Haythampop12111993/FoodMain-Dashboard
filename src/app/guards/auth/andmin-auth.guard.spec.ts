import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { andminAuthGuard } from './andmin-auth.guard';

describe('andminAuthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => andminAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
