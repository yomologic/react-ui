# Publishing & Release Guide

## Purpose

Document the release process, GitHub Actions workflow, and deployment pipeline for @yomologic/react-ui.

## Overview

This project uses a **manual version-bump trigger with automated CI/CD**:

1. Developer bumps version locally → Creates git tag
2. GitHub Actions detects tag → Builds and publishes to npm
3. Vercel detects master merge → Auto-deploys showcase site

## Release Process (Manual)

### Step 1: Ensure All Changes Are Merged to Master

```bash
git checkout master
git pull origin master
```

### Step 2: Bump Version

Use one of these npm scripts in the root package.json:

```bash
npm run release:patch   # 0.6.8 → 0.6.9 (bug fixes, docs)
npm run release:minor   # 0.6.8 → 0.7.0 (new features, non-breaking changes)
npm run release:major   # 0.6.8 → 1.0.0 (breaking changes)
```

What happens:

- Updates `version` field in `package.json`
- Creates annotated git tag (e.g., `v0.6.9`)
- Pushes to `origin/master` with tags

**Example:**

```bash
npm run release:patch
# Output: v0.6.9 tag created and pushed
```

Current version: **0.6.8**

### Step 3: Wait for GitHub Actions

GitHub Actions `.github/workflows/publish.yml` is triggered by the tag push and automatically:

1. Checks out the tagged code
2. Builds the library (`yarn build`)
3. Removes `private: true` and `workspaces` from package.json (only library publishes, not site)
4. Publishes to npm with OIDC provenance signature

Check status: https://github.com/yomologic/react-ui/actions

On success:

- Package available on npm: `npm install @yomologic/react-ui@0.6.9`
- Release published to GitHub: https://github.com/yomologic/react-ui/releases

## GitHub Actions Workflow

### File Location

`.github/workflows/publish.yml`

### Trigger Conditions

- **Only on:** Push of git tags matching pattern `v*.*.*`
- **Branches:** All (but triggered by tag, not branch)

### Workflow Steps

| Step                 | What It Does                               | Why                                                 |
| -------------------- | ------------------------------------------ | --------------------------------------------------- |
| Checkout code        | Clones repo at tag                         | Ensures exact tagged version                        |
| Setup Node 20        | Installs Node + npm                        | Required for build and publish                      |
| Prepare package.json | Removes `workspaces`, `private` flags      | Ensures library (not workspace) is published        |
| Install dependencies | `yarn install --frozen-lockfile`           | Lock exact versions for reproducible builds         |
| Build package        | `yarn build`                               | Generates `dist/` with compiled JS, CSS, types      |
| Update npm           | Installs latest npm version                | Ensures latest npm features                         |
| Publish to npm       | `npm publish --provenance --access public` | Publishes with OIDC signature proving GitHub origin |

### OIDC Provenance

The `--provenance` flag creates a cryptographic proof that:

- Code was published from GitHub Actions
- Code was built from the exact tagged commit
- No tampering occurred between build and publish

This is a security best practice for npm packages.

### Logs & Debugging

If publish fails:

1. Check workflow run: https://github.com/yomologic/react-ui/actions
2. Click the failed run
3. Expand "Publish to npm" step for error details

Common issues:

- **403 Forbidden:** npm credentials missing or expired
- **Package already exists:** Tag already published (try next version)
- **Build failures:** Type errors or lint issues in code

## Vercel Deployment (Showcase Site)

### Configuration

`vercel.json` at repo root:

```json
{
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "buildCommand": "cd .. && yarn build && cd site && yarn build",
    "installCommand": "cd .. && node vercel-setup.js && cd site && yarn install",
    "outputDirectory": ".next"
}
```

### Deployment Flow

1. Push to `master` branch → Vercel webhook triggered
2. Vercel runs install command:
    - Runs `vercel-setup.js` (root setup)
    - Installs site dependencies
3. Vercel runs build command:
    - Builds library (`yarn build` from root)
    - Builds Next.js showcase site
4. Vercel deploys `.next` folder to https://react-ui.yomologic.com/

### Manual Redeploy

If showcase doesn't update after merge:

```bash
vercel --prod
```

Or via Vercel dashboard: https://vercel.com/dashboard

## Dependency Configuration

### Primary Package (`package.json`)

- **private: true** - Prevents accidental root publish
- **workspaces: ["site"]** - Yarn workspace for monorepo
- **main, module, types, exports** - Package entry points

### Site Package (`site/package.json`)

- **Separate dependencies** for Next.js showcase
- Uses path mapping to import from library during dev

## Pre-Release Checklist

Before running `npm run release:*`:

- [ ] All PRs merged to master
- [ ] All tests passing (`yarn type-check`, `yarn lint`)
- [ ] CHANGELOG or release notes prepared (optional but recommended)
- [ ] Verified showcase site works locally (`cd site && yarn dev`)
- [ ] Checked for any breaking changes

## Post-Release Validation

After GitHub Actions completes:

1. **Verify npm package:**

    ```bash
    npm view @yomologic/react-ui@<VERSION>
    ```

    Should show correct version and publish time.

2. **Test installation:**

    ```bash
    npm install @yomologic/react-ui@<VERSION>
    ```

3. **Check showcase deployment:**
   Visit https://react-ui.yomologic.com/ and verify latest docs/components are live.

4. **Verify GitHub release:**
   Check https://github.com/yomologic/react-ui/releases for tag and auto-generated changelog.

## Troubleshooting

### Problem: "Cannot find version tag"

- **Solution:** Ensure tag format is exactly `v<major>.<minor>.<patch>` (e.g., `v0.6.9`)
- Check: `git tag -l` to list existing tags

### Problem: GitHub Actions failed with "401 Unauthorized"

- **Solution:** npm token credentials expired or missing in GitHub Secrets
- **Fix:** Update npm token in https://github.com/yomologic/react-ui/settings/secrets/actions
- Requires: Maintainer access and npm account owner permission

### Problem: Showcase site not updating after publish

- **Solution:**
    1. Ensure changes are merged to master
    2. Wait 2-3 minutes for Vercel webhook
    3. Check Vercel deployment logs: https://vercel.com/dashboard
    4. Manually trigger: `vercel --prod`

### Problem: Package.json shows wrong version after git pull

- **Solution:** npm version command creates a local commit; pull to sync
    ```bash
    git pull origin master
    ```

## Version Numbering Scheme

This project uses **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

| Bump      | When                                                   | Example       |
| --------- | ------------------------------------------------------ | ------------- |
| **PATCH** | Bug fixes, docs, non-breaking improvements             | 0.6.8 → 0.6.9 |
| **MINOR** | New features, new components, non-breaking API changes | 0.6.8 → 0.7.0 |
| **MAJOR** | Breaking changes, major refactors                      | 0.6.8 → 1.0.0 |

## Source of Truth

- **Version:** `package.json` version field (currently 0.6.8)
- **Build output:** GitHub Actions logs at actions tab
- **Published package:** npm registry at https://www.npmjs.com/package/@yomologic/react-ui
- **Latest tag:** `git tag -l | sort -V | tail -1`

## Update Policy

Update this document when:

- Release process or npm scripts change
- GitHub Actions workflow is modified
- Vercel configuration changes
- New authentication or signing requirements are added

## Changelog

- 2026-06-17: Initial publishing guide created
