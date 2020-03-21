import { InjectionToken } from '@angular/core';
import { BrowserOptions, captureException, init } from '@sentry/browser';

export const SENTRY_INIT = new InjectionToken<typeof init>('SENTRY_INIT', {
  providedIn: 'root',
  factory() {
    return init;
  }
});

export const SENTRY_CAPTURE_EXCEPTION = new InjectionToken<typeof captureException>('SENTRY_CAPTURE_EXCEPTION', {
  providedIn: 'root',
  factory() {
    return captureException;
  }
});

export const SENTRY_BROWSER_OPTIONS = new InjectionToken<BrowserOptions>('SENTRY_BROWSER_OPTIONS', {
  providedIn: 'root',
  factory() {
    return {
      enabled: false
    };
  }
});
