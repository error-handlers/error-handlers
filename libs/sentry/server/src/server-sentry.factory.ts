import {
  defaultIntegrations,
  NodeClient,
  NodeOptions,
  Hub
} from '@sentry/node';

export function serverSentryFactory(options: NodeOptions): Hub {
  const client = new NodeClient({
    integrations: defaultIntegrations,
    ...options
  });

  const hub = new Hub(client);

  hub.configureScope(scope => scope.setTag('render on', 'server'));

  return hub;
}
