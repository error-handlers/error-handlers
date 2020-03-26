import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY, SENTRY_OPTIONS } from './tokens';
import { Options } from '@sentry/types';
import { Hub } from '@sentry/core';

/**
 * An error handler for reporting to Sentry
 */
@Injectable()
export class SentryService implements ErrorHandler {
  /**
   *
   * @param options
   * @param sentry
   * @internal
   */
  constructor(
    @Inject(SENTRY_OPTIONS) options: Options,
    @Inject(SENTRY) public sentry: Hub
  ) {}

  handleError(error: any): void {
    if (error) {
      this.sentry.captureException(error);
    }
  }
}
