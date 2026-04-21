import * as Sentry from '@sentry/capacitor';
import * as SentryReact from '@sentry/react';
import { captureConsoleIntegration } from '@sentry/integrations';
export class SentryFrontendErrorLogger {
    constructor() {
        // check if required environment variables are set
        if (!process.env.SENTRY_DSN ||
            !process.env.NODE_ENV ||
            !process.env.SITE_ROOT) {
            console.error('Required environment variables sentry are not set. Sentry is not initialized.');
            return;
        }
        // disable logging during development
        if (process.env.NODE_ENV === 'development') {
            console.log('Sentry is disabled in development mode.');
            return;
        }
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.NODE_ENV,
            // Set your release version, such as "projectname@1.0.0"
            release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
            integrations: [
                //NOTE: had to upgrade @sentry/capacitor to make this compile
                Sentry.browserTracingIntegration(),
                Sentry.replayIntegration({
                    maskAllText: false,
                    blockAllMedia: false,
                }),
                captureConsoleIntegration({
                    levels: ['error'],
                }),
            ],
            // Performance Monitoring
            tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
            // Session Replay
            replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
            replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        }, 
        // Forward the init method from @sentry/react
        SentryReact.init);
    }
}
//# sourceMappingURL=SentryFrontendErrorLogger.js.map