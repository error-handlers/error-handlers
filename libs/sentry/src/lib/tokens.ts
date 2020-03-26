import { InjectionToken } from '@angular/core';
import { Options } from '@sentry/types';
import { Hub } from '@sentry/core';

export const SENTRY = new InjectionToken<Hub>('SENTRY');

export const SENTRY_OPTIONS = new InjectionToken<Options>('SENTRY_OPTIONS', {
  providedIn: 'root',
  factory() {
    return {
      enabled: false
    };
  }
});
