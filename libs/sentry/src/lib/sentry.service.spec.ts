import { TestBed } from '@angular/core/testing';
import { SENTRY } from '@error-handlers/sentry';

import { SentryService } from './sentry.service';
import { BrowserClient, Hub } from '@sentry/browser';
import * as sentryTestkit from 'sentry-testkit';

const { sentryTransport } = sentryTestkit();

function sentryTestFactory() {
  const client = new BrowserClient({
    dsn: 'http://public:secret@qwer.ty/1',
    transport: sentryTransport
  });

  return new Hub(client);
}

describe('SentryService', () => {
  let service: SentryService;
  let sentry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SentryService,
        {
          provide: SENTRY,
          useValue: sentryTestFactory
        }
      ]
    });
    service = TestBed.inject(SentryService);
    sentry = TestBed.inject(SENTRY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(sentry).toBeTruthy();
  });
});
