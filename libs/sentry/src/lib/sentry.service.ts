import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY, Sentry, SENTRY_OPTIONS } from './tokens';
import { Options } from '@sentry/types';

@Injectable()
export class SentryService implements ErrorHandler {
  public readonly sentry: Readonly<Sentry>;

  constructor(@Inject(SENTRY_OPTIONS) options: Options,
              @Inject(SENTRY) sentry: Sentry) {
    this.sentry = sentry;

    this.sentry.init(options);
  }

  handleError(error: any): void {
    if (error) {
      this.sentry.captureException(error);
    }
  }
}
