import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY, Sentry, SENTRY_BROWSER_OPTIONS } from './tokens';
import { BrowserOptions } from '@sentry/browser';

@Injectable()
export class SentryService implements ErrorHandler {
  constructor(@Inject(SENTRY_BROWSER_OPTIONS) browserOptions: BrowserOptions,
              @Inject(SENTRY) public readonly sentry: Readonly<Sentry>) {
    sentry.init(browserOptions);
  }

  handleError(error: any): void {
    if (error) {
      this.sentry.captureException(error);
    }
  }
}
