"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryBackendErrorLogger = void 0;
let sentryModule = null;
class SentryBackendErrorLogger {
    constructor(server) {
        // check if required environment variables are set
        if (!process.env.SENTRY_DSN ||
            !process.env.NODE_ENV ||
            !process.env.SITE_ROOT) {
            console.error('Required environment variables sentry are not set. Sentry is not initialized on SentryBackendProvider.');
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
    log(error) {
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
exports.SentryBackendErrorLogger = SentryBackendErrorLogger;
//# sourceMappingURL=SentryBackendErrorLogger.js.map