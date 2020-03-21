import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserOptions } from '@sentry/browser';
import { ErrorHandlersModule } from '@error-handlers/core';
import { SentryService } from './sentry.service';
import { SENTRY_BROWSER_OPTIONS } from './tokens';

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
          provide: SENTRY_BROWSER_OPTIONS,
          useValue: browserOptions
        }
      ]
    };
  }
}
