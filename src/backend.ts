import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
import * as Sentry from '@sentry/node';
import { SentryBackendErrorLogger } from './utils/SentryBackendErrorLogger.js';
import { LinkedErrorLogging } from '@_linked/core/utils/LinkedErrorLogging';
import { initSentryInstrumentation } from './utils/instrument.js';
import { shouldEnableSentry } from './utils/sentry-config.js';

export default class SentryBackendProvider extends BackendProvider {
  setupBeforeControllers() {
    if (shouldEnableSentry()) {
      initSentryInstrumentation();
      LinkedErrorLogging.setDefaultLogger(new SentryBackendErrorLogger());
    }
  }

  setupAfterControllers() {
    if (shouldEnableSentry()) {
      Sentry.setupExpressErrorHandler(this.server);
    }
  }
}
