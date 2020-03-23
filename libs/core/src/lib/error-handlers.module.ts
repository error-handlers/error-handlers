import { ErrorHandler, Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ErrorHandlersService, ErrorHandlerType } from './error-handlers.service';

export const ERROR_HANDLERS_TOKEN = new InjectionToken<ErrorHandlerType[][]>('ERROR_HANDLERS_TOKEN');

/**
 * Error handler configuration and registration module
 */
@NgModule()
export class ErrorHandlersModule {

  /**
   *
   * @param allErrorHandlers
   * @param errorHandlerService
   * @param errHandler
   * @internal
   */
  constructor(@Optional() @Inject(ERROR_HANDLERS_TOKEN) allErrorHandlers: ErrorHandlerType[][],
              errorHandlerService: ErrorHandlersService,
              errHandler: ErrorHandler) {
    if (errorHandlerService !== errHandler) {
      throw new Error('ErrorHandlersModule.forRoot must be imported in the root module!');
    }

    allErrorHandlers.forEach(errorHandlers =>
      errorHandlers.forEach(errorHandler => errorHandlerService.registry(errorHandler))
    );
  }

  /**
   * Returns the setting for import to the root module
   * @param errorHandlers Array of error handlers
   *
   * @example
   *
   * @NgModule({
   *   imports: [ErrorHandlersModule.forRoot([CustomErrorHandler])]
   * })
   * export class AppModule { }
   */
  public static forRoot(errorHandlers: ErrorHandlerType[] = []): ModuleWithProviders<ErrorHandlersModule> {
    return {
      ngModule: ErrorHandlersModule,
      providers: [
        {
          provide: ErrorHandler,
          useExisting: ErrorHandlersService
        },
        {
          provide: ERROR_HANDLERS_TOKEN,
          useValue: errorHandlers
        }
      ]
    };
  }

  /**
   * Error handlers registration in the child module
   * @param errorHandlers Array of error handlers
   *
   * @example
   *
   * @NgModule({
   *   imports: [ErrorHandlersModule.addErrorHandlers([CustomErrorHandler])]
   * })
   * export class ChildModule { }
   */
  public static addErrorHandlers(errorHandlers: ErrorHandlerType[]): ModuleWithProviders<ErrorHandlersModule> {
    return {
      ngModule: ErrorHandlersModule,
      providers: [
        {
          provide: ERROR_HANDLERS_TOKEN,
          useValue: errorHandlers
        }
      ]
    };
  }
}
