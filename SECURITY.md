# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a security vulnerability. Contact the
maintainer through GitHub's private vulnerability reporting for this repo,
or open a draft security advisory, with a minimal reproduction if possible.

## Scope

This library does not handle credentials, does not log query contents, and
does not store data. It only manages transaction lifecycle and retries.

One security-relevant warning, repeated from the README: retries re-run
your callback. If your callback has a non-idempotent external side effect,
a retry can repeat that side effect. Use idempotency keys for any external
call inside a transaction callback.
