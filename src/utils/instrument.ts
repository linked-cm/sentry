import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Set your release version, such as "projectname@1.0.0"
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,

  integrations: [
    // enable Node.js profiling
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
