import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
import * as Sentry from '@sentry/node';
import { SentryBackendErrorLogger } from './utils/SentryBackendErrorLogger.js';
import { LinkedErrorLogging } from '@_linked/core/utils/LinkedErrorLogging';
export default class SentryBackendProvider extends BackendProvider {
    setupBeforeControllers() {
        // Set SentryBackendErrorLogger as the default logger
        LinkedErrorLogging.setDefaultLogger(new SentryBackendErrorLogger(this.server));
    }
    setupAfterControllers() {
        Sentry.setupExpressErrorHandler(this.server);
    }
}
//# sourceMappingURL=backend.js.map