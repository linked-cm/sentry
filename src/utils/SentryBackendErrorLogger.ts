import { IErrorLogger } from '@_linked/core/utils/LinkedErrorLogging';

type SentryModule = typeof import('@sentry/node');
let sentryModule: SentryModule | null = null;

export class SentryBackendErrorLogger implements IErrorLogger {
  constructor(server) {
    // check if required environment variables are set
    if (
      !process.env.SENTRY_DSN ||
      !process.env.NODE_ENV ||
      !process.env.SITE_ROOT
    ) {
      console.error(
        'Required environment variables sentry are not set. Sentry is not initialized on SentryBackendProvider.'
      );
      return;
    }

    // disable logging during development
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry is disabled in development mode.');
      return;
    }

    if (!sentryModule) {
      // Load Sentry lazily so development builds never touch the dependency.
      sentryModule = require('@sentry/node');
    }

    const Sentry = sentryModule;
    if (!Sentry) {
      console.error('Unable to load @sentry/node runtime');
      return;
    }

    console.log('Sentry initialized with DSN:', process.env.SENTRY_DSN);
    // RequestHandler creates a separate execution context, so that all
    // transactions/spans/breadcrumbs are isolated across requests
    Sentry.setupExpressErrorHandler(server);
  }

  /**
   * capture and log error to Sentry
   *
   * @param error
   * @returns
   */
  log(error: any): Promise<void> {
    return new Promise((resolve) => {
      if (!sentryModule) {
        resolve();
        return;
      }

      sentryModule.captureException(error);
      resolve();
    });
  }
}
