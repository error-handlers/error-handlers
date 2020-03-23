import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY, Sentry, SENTRY_BROWSER_OPTIONS } from './tokens';
import { BrowserOptions } from '@sentry/browser';

@Injectable()
export class SentryService implements ErrorHandler {
  public readonly sentry: Readonly<Sentry>;

  constructor(@Inject(SENTRY_BROWSER_OPTIONS) browserOptions: BrowserOptions,
              @Inject(SENTRY) sentry: Sentry) {
    this.sentry = sentry;

    this.sentry.init(browserOptions);
  }

  handleError(error: any): void {
    if (error) {
      this.sentry.captureException(error);
    }
  }
}
