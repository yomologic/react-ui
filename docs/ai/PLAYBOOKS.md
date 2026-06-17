# AI Playbooks

## Purpose

Step-by-step workflows for common tasks so AI can execute quickly and consistently.

## Scope

Covers recurring contributor workflows in this repository.
Excludes one-off project management tasks.

## Source Of Truth

Implementation behavior is defined by:

1. ../guides/COMPONENT-DEVELOPMENT-GUIDE.md
2. ../guides/SHOWCASE-GUIDE.md
3. ../guides/THEME_SYSTEM.md
4. ../guides/THEME_QUICK_REFERENCE.md

## Rules

- MUST follow checklist order in each playbook.
- MUST include verification steps.
- SHOULD stop and ask when a step conflicts with source docs.

## Playbook 1: Add A Library Component

1. Create src/ui/<component-name>.tsx using existing component patterns.
2. Add types and props interface in the same file unless project pattern requires split files.
3. Export component and types from src/index.ts.
4. Add or adjust CSS variables/classes in src/styles.css or src/base.css if needed.
5. Add showcase page at site/src/app/(showcase)/components/<component-name>/page.tsx.
6. Add navigation entry in site/src/app/(showcase)/layout.tsx if applicable.
7. Run yarn type-check and yarn lint.
8. Update docs in docs/guides/ where API or usage changed.

Done criteria:

- Importable from package root exports.
- Showcase page demonstrates core variants and usage.
- No lint/type errors.

## Playbook 2: Add A Showcase Page Only

1. Create/edit page under site/src/app/(showcase)/components/<component-name>/page.tsx.
2. Use SectionLayout wrapper.
3. Follow section pattern from ../guides/SHOWCASE-GUIDE.md.
4. Ensure examples show one component instance with interactive controls.
5. Add API reference section and usage examples.
6. Validate with site lint.

Done criteria:

- Page renders in showcase route.
- Structure matches guide.
- Code snippets reflect selected state.

## Playbook 3: Update Theme Tokens

1. Identify whether change belongs to library theme variables or showcase-only settings.
2. Apply naming standards from ../guides/THEME_QUICK_REFERENCE.md.
3. Keep semantic variables over component-specific naming when possible.
4. Update all impacted theme definitions and usages.
5. Validate typography/color utilities still map correctly.
6. Run lint and type-check.

Done criteria:

- Token names are standardized.
- No broken references.
- Backward compatibility preserved or documented.

## Update Policy

Add a new playbook when a task repeats 3 or more times.
Refine steps after defects, regressions, or repeated review comments.

## Changelog

- 2026-06-17: Initial playbooks for component, showcase, and theme workflows.
