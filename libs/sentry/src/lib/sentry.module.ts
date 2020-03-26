import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserOptions } from '@sentry/browser';
import { ErrorHandlersModule } from '@error-handlers/core';
import { SentryService } from './sentry.service';
import { SENTRY, SENTRY_OPTIONS } from './tokens';
import { sentryBrowserFactory } from './sentry.factory';

/**
 * Sentry module
 *
 * For SSR {@see ServerSentryModule}
 *
 * @example
 *
 * @NgModule({
 *   import: [
 *     ErrorHandlersModule.forRoot(),
 *     SentryModule.forRoot()
 *   ]
 * })
 * export class AppModule { }
 */
@NgModule({
  imports: [
    ErrorHandlersModule.addErrorHandlers([
      {
        provide: SentryService,
        useExisting: SentryService
      }
    ])
  ]
})
export class SentryModule {
  public static forRoot(
    browserOptions: BrowserOptions
  ): ModuleWithProviders<SentryModule> {
    return {
      ngModule: SentryModule,
      providers: [
        SentryService,
        {
          provide: SENTRY_OPTIONS,
          useValue: browserOptions
        },
        {
          provide: SENTRY,
          useValue: sentryBrowserFactory,
          deps: [Inject(SENTRY_OPTIONS)]
        }
      ]
    };
  }
}
