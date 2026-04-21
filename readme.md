# How to use LINCD Sentry

## Introduction

LINCD Sentry is a powerful error tracking tool that can be integrated into both Express (backend) and React (frontend) applications.

## Installation

To install LINCD Sentry, use the following command:

```json
yarn add @sentry/capacitor lincd-sentry
```

Next, add the `SENTRY_DSN` and `SITE_ROOT` to your environment variables. This can be obtained from your Sentry Project Settings.

```
"SITE_ROOT": "https://app.your-project.com",
"SENTRY_DSN": "https://1984939c....ingest.us.sentry.io/4506862...",
```

#### Usage

##### Frontend

To use LINCD Sentry in your frontend application, import `LinkedErrorLogging` from `lincd` and `SentryFrontendErrorLogger` from `lincd-sentry` in your main index file.

```tsx
import { LinkedErrorLogging } from '@_linked/core/lib/utils/LinkedErrorLogging';
import { SentryFrontendErrorLogger } from 'lincd-sentry/lib/utils/SentryFrontendErrorLogger';

// init sentry logging before rendering the app
LinkedErrorLogging.setDefaultLogger(new SentryFrontendErrorLogger());
```

##### Backend

If you have `SENTRY_DSN` and `SITE_ROOT` defined in your environment variables, the Sentry backend will be set up automatically.
