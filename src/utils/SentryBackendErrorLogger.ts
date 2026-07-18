import type { IErrorLogger } from '@_linked/core/utils/LinkedErrorLogging';
import * as Sentry from '@sentry/node';
import { shouldEnableSentry } from './sentry-config.js';

export class SentryBackendErrorLogger implements IErrorLogger {
  private enabled = shouldEnableSentry();

  log(error: any): Promise<void> {
    if (this.enabled) {
      Sentry.captureException(error);
    }
    return Promise.resolve();
  }
}
