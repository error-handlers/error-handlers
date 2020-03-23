import { InjectionToken } from '@angular/core';
import * as sentry from '@sentry/browser';
import {
  addBreadcrumb,
  addGlobalEventProcessor,
  BrowserOptions,
  captureEvent,
  captureException,
  captureMessage,
  close,
  configureScope,
  defaultIntegrations,
  flush,
  forceLoad,
  getCurrentHub,
  getHubFromCarrier,
  init,
  lastEventId,
  onLoad,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  showReportDialog,
  withScope,
  wrap
} from '@sentry/browser';

export interface Sentry {
  init: typeof init;

  addBreadcrumb: typeof addBreadcrumb;
  captureEvent: typeof captureEvent;
  captureException: typeof captureException;
  captureMessage: typeof captureMessage;
  configureScope: typeof configureScope;
  setContext: typeof setContext;
  setExtra: typeof setExtra;
  setExtras: typeof setExtras;
  setTag: typeof setTag;
  setTags: typeof setTags;
  setUser: typeof setUser;
  withScope: typeof withScope;

  close: typeof close;
  showReportDialog: typeof showReportDialog;
  addGlobalEventProcessor: typeof addGlobalEventProcessor;
  defaultIntegrations: typeof defaultIntegrations;
  flush: typeof flush;
  forceLoad: typeof forceLoad;
  getCurrentHub: typeof getCurrentHub;
  getHubFromCarrier: typeof getHubFromCarrier;
  lastEventId: typeof lastEventId;
  onLoad: typeof onLoad;
  wrap: typeof wrap;
}

export const SENTRY = new InjectionToken<Sentry>('SENTRY', {
  providedIn: 'root',
  factory() {
    return sentry;
  }
});

export const SENTRY_BROWSER_OPTIONS = new InjectionToken<BrowserOptions>('SENTRY_BROWSER_OPTIONS', {
  providedIn: 'root',
  factory() {
    return {
      enabled: false
    };
  }
});
