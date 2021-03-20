import { TestBed } from '@angular/core/testing';

import { AuthMechanicGuard } from './auth-mechanic.guard';

describe('AuthMechanicGuard', () => {
  let guard: AuthMechanicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthMechanicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
