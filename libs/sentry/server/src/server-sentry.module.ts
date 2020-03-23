import { ModuleWithProviders, NgModule } from '@angular/core';
import { SENTRY, SENTRY_OPTIONS } from '@error-handlers/sentry';
import * as sentry from '@sentry/node';
import { NodeOptions } from '@sentry/node';

/**
 * Sentry module for SSR
 *
 * @example
 *
 * @NgModule({
 *   import: [
 *     ServerSentryModule.forRoot()
 *   ]
 * })
 * export class ServerAppModule { }
 *
 */
@NgModule()
export class ServerSentryModule {
  public static forRoot(options?: NodeOptions): ModuleWithProviders<ServerSentryModule> {
    return {
      ngModule: ServerSentryModule,
      providers: [
        {
          provide: SENTRY,
          useValue: sentry
        },
        options
          ? {
            provide: SENTRY_OPTIONS,
            useValue: options
          }
          : []
      ]
    };
  }
}
