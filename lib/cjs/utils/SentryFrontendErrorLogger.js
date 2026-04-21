"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentryFrontendErrorLogger = void 0;
const Sentry = __importStar(require("@sentry/capacitor"));
const SentryReact = __importStar(require("@sentry/react"));
const integrations_1 = require("@sentry/integrations");
class SentryFrontendErrorLogger {
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
                (0, integrations_1.captureConsoleIntegration)({
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
exports.SentryFrontendErrorLogger = SentryFrontendErrorLogger;
//# sourceMappingURL=SentryFrontendErrorLogger.js.map