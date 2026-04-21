import { BackendProvider } from '@_linked/server-utils/utils/BackendProvider';
export default class SentryBackendProvider extends BackendProvider {
    setupBeforeControllers(): void;
    setupAfterControllers(): void;
}
