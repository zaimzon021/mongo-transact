# Changelog

## 0.1.0 — 2026-11-03

- Initial release.
- `withTransaction()` and `createTransactionRunner()`.
- Automatic session lifecycle: session is always ended, even on failure.
- Retry only for MongoDB transient transaction errors, with exponential
  backoff and jitter.
- Timeout support, commit/abort hooks, and a clear error taxonomy
  (`TransactionAbortedError`, `TransactionRetriesExhaustedError`,
  `TransactionTimeoutError`), all preserving the original error on `.cause`.
- Unit tests using a fake client/session, so no live MongoDB is required.
- Express checkout example.
