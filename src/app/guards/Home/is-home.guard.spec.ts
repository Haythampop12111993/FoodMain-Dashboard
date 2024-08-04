import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { isHomeGuard } from './is-home.guard';

describe('isHomeGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isHomeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
