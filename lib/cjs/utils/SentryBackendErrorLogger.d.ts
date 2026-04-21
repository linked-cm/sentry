import { IErrorLogger } from '@_linked/core/utils/LinkedErrorLogging';
export declare class SentryBackendErrorLogger implements IErrorLogger {
    constructor(server: any);
    /**
     * capture and log error to Sentry
     *
     * @param error
     * @returns
     */
    log(error: any): Promise<void>;
}
