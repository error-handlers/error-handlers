import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY_BROWSER_OPTIONS, SENTRY_CAPTURE_EXCEPTION, SENTRY_INIT } from './tokens';
import { BrowserOptions } from '@sentry/browser';

@Injectable()
export class SentryService implements ErrorHandler {

  constructor(@Inject(SENTRY_BROWSER_OPTIONS) browserOptions: BrowserOptions,
              @Inject(SENTRY_CAPTURE_EXCEPTION) private captureException: any,
              @Inject(SENTRY_INIT) init: any
  ) {
    init(browserOptions);
  }

  handleError(error: any): void {
    if (error) {
      this.captureException(error);
    }
  }
}
