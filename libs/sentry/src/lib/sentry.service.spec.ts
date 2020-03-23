import { TestBed } from '@angular/core/testing';
import { SENTRY } from '@error-handlers/sentry';

import { SentryService } from './sentry.service';

describe('SentryService', () => {
  let service: SentryService;
  let sentry;

  beforeEach(() => {
    sentry = {
      init() {
      }
    };

    TestBed.configureTestingModule({
      providers: [
        SentryService,
        {
          provide: SENTRY,
          useValue: sentry
        }
      ]
    });
    service = TestBed.inject(SentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
