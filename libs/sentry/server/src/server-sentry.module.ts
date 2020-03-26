import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { SENTRY, SENTRY_OPTIONS } from '@error-handlers/sentry';
import { NodeOptions } from '@sentry/node';
import { serverSentryFactory } from './server-sentry.factory';

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
  public static forRoot(
    options?: NodeOptions
  ): ModuleWithProviders<ServerSentryModule> {
    return {
      ngModule: ServerSentryModule,
      providers: [
        {
          provide: SENTRY,
          useValue: serverSentryFactory,
          deps: [Inject(SENTRY_OPTIONS)]
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
