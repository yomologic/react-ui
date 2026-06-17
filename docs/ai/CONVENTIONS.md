# AI Conventions

## Purpose

Stable coding and documentation conventions for AI-assisted contributions.

## Scope

Covers naming, structure, quality gates, and conflict handling.
Excludes feature-specific implementation details.

## Source Of Truth

Primary references:

1. ../guides/ARCHITECTURE.md
2. ../guides/COMPONENT-DEVELOPMENT-GUIDE.md
3. ../guides/SHOWCASE-GUIDE.md
4. ../guides/THEME_SYSTEM.md
5. ../guides/THEME_QUICK_REFERENCE.md

## Rules

- MUST keep library public exports in src/index.ts.
- MUST keep component files in src/ui, not ad-hoc folders.
- MUST use lowercase, kebab-case component filenames.
- MUST keep showcase pages under site/src/app/(showcase)/components/<name>/page.tsx.
- MUST use CSS variable naming conventions for theme work.
- MUST use semantic typography classes instead of ad-hoc text sizing when required by theme docs.
- MUST preserve backward compatibility unless change request explicitly allows a breaking change.
- MUST add or update docs when behavior or API changes.
- SHOULD prefer small, focused PRs.
- SHOULD include validation commands in PR description.
- MUST NOT duplicate conflicting guidance in multiple files.

## Good vs Bad

Good:

- Add component in src/ui/rating.tsx and export from src/index.ts.
- Add showcase page in site/src/app/(showcase)/components/rating/page.tsx.

Bad:

- Add component in src/components/ui/rating.tsx while current API reads from src/ui.
- Ship component changes without export updates.

## Validation Standard

Run before handoff:

- yarn type-check
- yarn lint

For showcase app changes, also run:

- yarn workspace @yomologic/react-ui-site lint

## Conflict Resolution

When two docs disagree, follow precedence in ./AI_CONTEXT.md.
If conflict is unresolved, raise a short note in PR and propose the source-of-truth update.

## Update Policy

Update this file when coding standards or quality gates change.

## Changelog

- 2026-06-17: Initial conventions for AI-assisted workflows.
