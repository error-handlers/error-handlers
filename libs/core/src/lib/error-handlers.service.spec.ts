import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from '@angular/core';

import { ErrorHandlersService, ErrorHandlerType } from './error-handlers.service';

describe('ErrorHandlersService', () => {
  let service: ErrorHandlersService;
  let consoleErrorSpy: jasmine.Spy;

  let errorHandler: ErrorHandlerType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlersService);

    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('if you pass an error, console.error will be raised', () => {
    const error = new Error('test');
    service.handleError(error);

    expect(consoleErrorSpy).toBeCalledTimes(1);
    expect(consoleErrorSpy).toBeCalledWith('ERROR', error);
  });

  it('error handler called after registration', () => {
    service.registry(ErrorHandler);

    const error = new Error('test');
    service.handleError(error);

    expect(consoleErrorSpy).toBeCalledTimes(2);
    expect(consoleErrorSpy).toBeCalledWith('ERROR', error);
  });

  describe('error handler registry', () => {
    it('an error handler is a class', () => {
      errorHandler = class ExtendedErrorHandler extends ErrorHandler {
      };

      service.registry(errorHandler);
      expect(service.get(errorHandler)).toBeInstanceOf(errorHandler);
    });

    it('an error handler is an instance of ErrorHandler', () => {
      errorHandler = new ErrorHandler();

      service.registry(errorHandler);
      expect(service.get(errorHandler)).toEqual(errorHandler);
    });

    it('an error handler is an implementation of ErrorHandler', () => {
      class ErrorHandlerImplementation implements ErrorHandler {
        handleError(error: any): void {
        }
      }

      errorHandler = new ErrorHandlerImplementation();

      service.registry(errorHandler);
      expect(service.get(errorHandler)).toEqual(errorHandler);
    });

    it('an error handler is StaticClassSansProvider', () => {
      errorHandler = {
        useClass: ErrorHandler,
        deps: []
      };

      service.registry(errorHandler);
      expect(service.get(ErrorHandler)).toBeInstanceOf(ErrorHandler);
    });

    it('an error handler is StaticProvider', () => {
      errorHandler = {
        provide: ErrorHandler,
        useFactory: () => new ErrorHandler(),
        deps: []
      };

      service.registry(errorHandler);
      expect(service.get(ErrorHandler)).toBeInstanceOf(ErrorHandler);
    });
  });
});
