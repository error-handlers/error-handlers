import {
  BrowserClient,
  BrowserOptions,
  defaultIntegrations,
  Hub
} from '@sentry/browser';
import { makeMain } from '@sentry/hub';

export function sentryBrowserFactory(options: BrowserOptions): Hub {
  const client = new BrowserClient({
    integrations: defaultIntegrations,
    ...options
  });

  const hub = new Hub(client);

  makeMain(hub);

  hub.run(() => {
    client.setupIntegrations();
  });

  return hub;
}
