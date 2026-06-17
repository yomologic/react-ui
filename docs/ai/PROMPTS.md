# AI Prompt Templates

## Purpose

Reusable prompt formats that produce predictable, high-quality AI changes.

## Scope

Task prompt templates for coding, docs, and review workflows in this repository.

## Source Of Truth

Behavior and structure constraints come from AI_CONTEXT.md and docs/ai/CONVENTIONS.md.

## Rules

- MUST include explicit files in scope.
- MUST include acceptance criteria.
- MUST include validation commands.
- SHOULD include constraints about backward compatibility.
- SHOULD request summary of changed files and risks.

## Prompt Format Standard

Use this six-block structure:

1. Goal
2. Constraints
3. Files In Scope
4. Acceptance Criteria
5. Validation Commands
6. Output Format

## Template 1: Add Component

Goal:
Add a new <component-name> component to the library and showcase.

Constraints:

- Follow COMPONENT-DEVELOPMENT-GUIDE.md and SHOWCASE-GUIDE.md.
- Preserve backward compatibility.
- Do not refactor unrelated files.

Files In Scope:

- src/ui/<component-name>.tsx
- src/index.ts
- site/src/app/(showcase)/components/<component-name>/page.tsx
- site/src/app/(showcase)/layout.tsx

Acceptance Criteria:

- Component exported from src/index.ts.
- Showcase page includes examples and API reference.
- No lint/type errors.

Validation Commands:

- yarn type-check
- yarn lint

Output Format:

- Summary
- Changed files
- Validation results
- Risks/assumptions

## Template 2: Theme Update

Goal:
Update theme tokens for <feature>.

Constraints:

- Follow THEME_QUICK_REFERENCE.md naming rules.
- Reuse semantic tokens before adding component-specific tokens.

Files In Scope:

- src/styles.css
- src/base.css
- src/themes/\*
- site/src/themes/\*

Acceptance Criteria:

- Token naming is consistent.
- All affected usages updated.
- No regressions in existing components.

Validation Commands:

- yarn type-check
- yarn lint

Output Format:

- Summary
- Changed files
- Token mapping (old to new)
- Validation results

## Template 3: Repo Review

Goal:
Review current branch for regressions, risks, and missing tests.

Constraints:

- Focus findings first.
- Prioritize correctness, accessibility, and API compatibility.

Files In Scope:

- Entire repo, with emphasis on changed files.

Acceptance Criteria:

- Findings grouped by severity.
- Each finding includes file and rationale.
- Explicitly state if no findings are present.

Validation Commands:

- yarn type-check
- yarn lint

Output Format:

- Findings (high to low severity)
- Open questions
- Change summary

## Update Policy

Add a new template after repeated ad-hoc prompts for the same task class.

## Changelog

- 2026-06-17: Initial prompt templates and standard structure.
