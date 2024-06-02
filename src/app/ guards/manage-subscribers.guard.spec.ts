import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { manageSubscribersGuard } from './manage-subscribers.guard';

describe('manageSubscribersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      manageSubscribersGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
