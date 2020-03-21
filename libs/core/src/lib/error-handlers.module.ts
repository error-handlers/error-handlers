import { ErrorHandler, Inject, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ErrorHandlersService, ErrorHandlerType } from './error-handlers.service';

export const ERROR_HANDLERS_TOKEN = new InjectionToken<ErrorHandlerType[][]>('ERROR_HANDLERS_TOKEN');

@NgModule()
export class ErrorHandlersModule {
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
