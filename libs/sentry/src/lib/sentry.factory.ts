import {
  BrowserClient,
  BrowserOptions,
  defaultIntegrations,
  Hub
} from '@sentry/browser';

export function sentryBrowserFactory(options: BrowserOptions): Hub {
  const client = new BrowserClient({
    integrations: defaultIntegrations,
    ...options
  });

  return new Hub(client);
}
