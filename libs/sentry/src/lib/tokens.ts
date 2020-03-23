import { InjectionToken } from '@angular/core';
import {
  addBreadcrumb,
  captureEvent,
  captureException,
  captureMessage,
  configureScope,
  setContext,
  setExtra,
  setExtras,
  setTag,
  setTags,
  setUser,
  withScope
} from '@sentry/minimal';
import { Options } from '@sentry/types';

export interface Sentry {
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

  init<T extends Options>(options?: T): void;
}

export const SENTRY = new InjectionToken<Sentry>('SENTRY');

export const SENTRY_OPTIONS = new InjectionToken<Options>('SENTRY_OPTIONS', {
  providedIn: 'root',
  factory() {
    return {
      enabled: false
    };
  }
});
