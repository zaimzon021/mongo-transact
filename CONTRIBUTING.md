# Contributing

Thanks for considering a contribution. This project is intentionally small:
one job, done well. PRs that keep it that way are welcome; PRs that turn it
into an ORM or query builder will be politely declined.

## How to contribute

1. Open an issue first for anything bigger than a typo or a small bug fix,
   so we can agree on the shape before you write code.
2. Fork, create a branch, and add a failing test that shows the problem.
3. Run `npm test` and make sure it passes.
4. Keep the public API small. If a feature needs a new option, explain in
   the PR why the existing options cannot cover it.

## What makes a good PR here

- A real bug, with a test that fails before and passes after.
- A documented edge case (timeout, abort failure, commit failure).
- Better docs or a better example, with code that actually runs or is
  clearly marked as illustrative.

## What will not be merged

- Trivial, duplicative, or automated bulk PRs with no real change.
- New dependencies without a strong reason.
- Breaking changes to the public API in a patch release.

## Release process (maintainer only)

1. Update `CHANGELOG.md`.
2. Bump the version in `package.json` following semver.
3. Tag the release on GitHub. CI runs `npm test` on every push and PR.
