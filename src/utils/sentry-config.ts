type SentryEventLike = {
  user?: Record<string, unknown>;
  request?: Record<string, unknown>;
  extra?: Record<string, unknown>;
  contexts?: Record<string, unknown>;
  breadcrumbs?: Array<Record<string, unknown>>;
  tags?: Record<string, unknown>;
};

const REDACTED = '[REDACTED]';
const DEFAULT_IGNORE_ERRORS = [
  'Network Error',
  'Failed to fetch',
  'AbortError',
];
const SENSITIVE_KEY_PATTERN =
  /email|phone|telephone|password|token|authorization|cookie|set-cookie|dsn/i;

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === 'object') {
    return sanitizeObject(value as Record<string, unknown>);
  }

  return value;
}

function sanitizeObject(obj: Record<string, unknown>) {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] = SENSITIVE_KEY_PATTERN.test(key)
      ? REDACTED
      : sanitizeValue(value);
  }

  return sanitized;
}

export function shouldEnableSentry() {
  return (
    process.env.SENTRY_ENABLED === 'true' &&
    !!process.env.SENTRY_DSN &&
    !!process.env.NODE_ENV &&
    !!process.env.SITE_ROOT
  );
}

export function getSentryRelease() {
  const packageName = process.env.npm_package_name || 'unknown';
  const version =
    process.env.VERSION || process.env.npm_package_version || 'unknown';
  return `${packageName}@${version}`;
}

export function getSentryEnvironment() {
  return process.env.NODE_ENV;
}

export function getSentryIgnoreErrors() {
  return DEFAULT_IGNORE_ERRORS;
}

export function sanitizeSentryEvent(event: SentryEventLike) {
  const sanitized: SentryEventLike = { ...event };

  for (const key of [
    'user',
    'request',
    'extra',
    'contexts',
  ] as const) {
    if (sanitized[key]) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }

  if (sanitized.breadcrumbs) {
    sanitized.breadcrumbs = sanitized.breadcrumbs.map((breadcrumb) =>
      sanitizeObject(breadcrumb)
    );
  }

  sanitized.tags = {
    ...(sanitized.tags || {}),
    app: process.env.APP_NAME || 'unknown',
    node_env: process.env.NODE_ENV || 'unknown',
    site_root: process.env.SITE_ROOT || 'unknown',
  };

  return sanitized;
}

export function getSentryBaseOptions() {
  return {
    dsn: process.env.SENTRY_DSN,
    environment: getSentryEnvironment(),
    release: getSentryRelease(),
    beforeSend(event) {
      return sanitizeSentryEvent(
        event as unknown as SentryEventLike
      ) as unknown as typeof event;
    },
    ignoreErrors: getSentryIgnoreErrors(),
  };
}
