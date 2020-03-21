import { TestBed } from '@angular/core/testing';
import { ErrorHandlersModule } from '@error-handlers/core';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlersService } from './error-handlers.service';

describe('ErrorHandlersModule', () => {
  beforeEach(() => {

  });

  it('module should be created', () => {
    TestBed.configureTestingModule({
      imports: [ErrorHandlersModule.forRoot()]
    });

    const errorHandler = TestBed.get(ErrorHandler);

    expect(errorHandler).toBeInstanceOf(ErrorHandlersService);
  });

  it('module should not be created', () => {
    TestBed.configureTestingModule({
      imports: [ErrorHandlersModule]
    });

    function throwFn() {
      return TestBed.get(ErrorHandler);
    }

    expect(throwFn).toThrow(Error);
  });
});
