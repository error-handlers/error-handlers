import { ModuleWithProviders, NgModule } from '@angular/core';
import * as sentry from '@sentry/browser';
import { BrowserOptions } from '@sentry/browser';
import { ErrorHandlersModule } from '@error-handlers/core';
import { SentryService } from './sentry.service';
import { SENTRY, SENTRY_OPTIONS } from './tokens';

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
  public static forRoot(browserOptions: BrowserOptions): ModuleWithProviders<SentryModule> {
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
          useValue: sentry
        }
      ]
    };
  }
}
