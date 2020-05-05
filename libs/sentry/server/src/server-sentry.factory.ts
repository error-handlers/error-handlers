import {
  defaultIntegrations,
  NodeClient,
  NodeOptions,
  Hub
} from '@sentry/node';
import { makeMain } from '@sentry/hub';

export function serverSentryFactory(options: NodeOptions): Hub {
  const client = new NodeClient({
    integrations: defaultIntegrations,
    ...options
  });

  const hub = new Hub(client);

  hub.configureScope(scope => scope.setTag('render on', 'server'));

  hub.run(() => {
    client.setupIntegrations();
  });

  makeMain(hub);

  return hub;
}
