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

/**
 * Error handler type
 * It can be an instance or implementation {@link ErrorHandler},
 * {@link StaticClassSansProvider}, a class that extends or implements
 * {@link ErrorHandler}, or simply {@link StaticProvider}
 */
export type ErrorHandlerType =
  | ErrorHandler
  | Type<ErrorHandler>
  | StaticClassSansProvider
  | Exclude<StaticProvider, any[]>;

/**
 * Will return `true` if the value is {@link StaticProvider}
 * @param value
 */
export function isStaticProvider(value: any): value is StaticProvider {
  return value && value.provide && value.deps;
}

/**
 * Will return `true` if the value is {@link StaticClassSansProvider}
 * @param value
 */
export function isStaticClassSansProvider(
  value: any
): value is StaticClassSansProvider {
  return value && !value.provide && value.deps && value.useClass;
}

/**
 * Will return `true` if the value is {@link ErrorHandler}
 * @param value
 */
export function isErrorHandlerInstanceOrImplementation(
  value: any
): value is ErrorHandler {
  return (
    value &&
    (value instanceof ErrorHandler || typeof value.handleError === 'function')
  );
}

/**
 * Service for registering and starting error handlers
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlersService extends ErrorHandler {
  private readonly errorHandlers: ErrorHandler[] = [];

  /**
   *
   * @param injector
   * @internal
   */
  constructor(private injector: Injector) {
    super();
  }

  /**
   * Called when an application error occurs
   * @param error
   */
  handleError(error: any): void {
    super.handleError(error);

    this.errorHandlers.forEach(errorHandler => errorHandler.handleError(error));
  }

  /**
   * Error handlers registration {@see ErrorHandlersModule}
   * @param errorHandler
   */
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

  /**
   * Getting an error handlers instance
   * @param token
   * @param notFoundValue
   * @param flags
   */
  get(
    token: ErrorHandler | Type<ErrorHandler> | InjectionToken<ErrorHandler>,
    notFoundValue?: ErrorHandler,
    /** @deprecated */ flags?: InjectFlags
  ): ErrorHandler {
    return this.injector.get<ErrorHandler>(
      token as Type<ErrorHandler>,
      notFoundValue,
      flags
    );
  }
}
