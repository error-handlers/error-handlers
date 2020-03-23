import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { SENTRY, Sentry, SENTRY_OPTIONS } from './tokens';
import { Options } from '@sentry/types';

/**
 * An error handler for reporting to Sentry
 */
@Injectable()
export class SentryService implements ErrorHandler {
  /**
   * import * as sentry from @sentry/{browser|node}
   */
  public readonly sentry: Readonly<Sentry>;

  /**
   *
   * @param options
   * @param sentry
   * @internal
   */
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
