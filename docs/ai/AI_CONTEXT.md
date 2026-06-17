# AI Context

## Purpose

Fast orientation for coding agents and contributors using AI in this repository.

## Scope

Includes project structure, source-of-truth order, and task routing.
Excludes deep implementation details that belong in feature docs.

## Source Of Truth

If documents conflict, use this precedence:

1. ../guides/ARCHITECTURE.md
2. src/index.ts
3. ../guides/COMPONENT-DEVELOPMENT-GUIDE.md
4. ../guides/SHOWCASE-GUIDE.md
5. ../guides/THEME_SYSTEM.md and ../guides/THEME_QUICK_REFERENCE.md
6. ../guides/PUBLISHING.md (for release and CI workflows)
7. ../../README.md

## Rules

- MUST treat the root package as the publishable library: @yomologic/react-ui.
- MUST treat site/ as the docs and showcase app.
- MUST export all public components from src/index.ts.
- MUST follow naming and file placement from ../guides/COMPONENT-DEVELOPMENT-GUIDE.md.
- MUST follow showcase page structure from ../guides/SHOWCASE-GUIDE.md.
- MUST follow theme variable naming from ../guides/THEME_SYSTEM.md.
- MUST NOT invent legacy paths like src/components/ui if the current source uses src/ui.
- SHOULD run type-check and lint before finalizing changes.
- SHOULD keep docs concise and machine-scannable.

## Quick Map

- Library package metadata: package.json
- Showcase package metadata: site/package.json
- Public API exports: src/index.ts
- Library components: src/ui
- Layout primitives: src/layout
- Feedback components: src/feedback
- Shared components: src/shared
- Theme provider (library): src/contexts/ThemeProvider.tsx
- Theme definitions (library): src/themes
- Showcase routes: site/src/app
- Showcase component demos: site/src/app/(showcase)/components
- Showcase theme context: site/src/contexts/ThemeContext.tsx

## Task Routing

- Add or modify a library component:
    - Edit src/ui/<name>.tsx
    - Export from src/index.ts
    - Add/adjust styles in src/styles.css or src/base.css as needed
- Add or modify a showcase page:
    - Edit site/src/app/(showcase)/components/<name>/page.tsx
    - Keep four-section pattern from ../guides/SHOWCASE-GUIDE.md
- Update theme system:
    - Follow variable conventions in ../guides/THEME_QUICK_REFERENCE.md
    - Keep compatibility with existing theme JSON/CSS flow

## Done Criteria

- Public API updated in src/index.ts if needed.
- Demo page and docs updated for user-facing changes.
- No contradictions with architecture/theme guides.
- Lint/type-check pass locally.

## Update Policy

Update this file when package layout, export strategy, or source-of-truth order changes.

## Changelog

- 2026-06-17: Initial AI context baseline created.
