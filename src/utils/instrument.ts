import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { getSentryBaseOptions, shouldEnableSentry } from './sentry-config.js';

export function initSentryInstrumentation() {
  if (!shouldEnableSentry() || Sentry.getClient()) {
    return;
  }

  Sentry.init({
    ...getSentryBaseOptions(),
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 0.1,
    profilesSampleRate: 1.0,
  });
}
