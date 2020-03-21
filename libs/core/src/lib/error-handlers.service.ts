import {
  ErrorHandler,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  StaticClassSansProvider,
  StaticProvider,
  Type
} from '@angular/core';

export type ErrorHandlerType =
  ErrorHandler
  | Type<ErrorHandler>
  | StaticClassSansProvider
  | Exclude<StaticProvider, any[]>;

export function isStaticProvider(value: any): value is StaticProvider {
  return value && value.provide && value.deps;
}

export function isStaticClassSansProvider(value: any): value is StaticClassSansProvider {
  return value && !value.provide && value.deps && value.useClass;
}

export function isErrorHandlerInstanceOrImplementation(value: any): value is ErrorHandler {
  return value && (value instanceof ErrorHandler || typeof value.handleError === 'function');
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlersService extends ErrorHandler {

  private readonly errorHandlers: ErrorHandler[] = [];

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any): void {
    super.handleError(error);

    this.errorHandlers.forEach(errorHandler => errorHandler.handleError(error));
  }

  registry(errorHandler: ErrorHandlerType) {
    let provider: StaticProvider;
    if (isStaticProvider(errorHandler)) {
      provider = errorHandler;
    } else if (isStaticClassSansProvider(errorHandler)) {
      provider = {
        provide: errorHandler.useClass,
        ...errorHandler
      };
    } else if (isErrorHandlerInstanceOrImplementation(errorHandler)) {
      provider = {
        provide: errorHandler,
        useValue: errorHandler
      };
    } else {
      provider = {
        provide: errorHandler,
        useClass: errorHandler,
        deps: []
      };
    }

    this.injector = Injector.create({
      providers: [provider],
      parent: this.injector
    });

    this.errorHandlers.push(this.get(provider.provide));
  }

  get(token: ErrorHandler | Type<ErrorHandler> | InjectionToken<ErrorHandler>, notFoundValue?: ErrorHandler, flags?: InjectFlags): ErrorHandler {
    return this.injector.get<ErrorHandler>(token as Type<ErrorHandler>, notFoundValue, flags);
  }
}
