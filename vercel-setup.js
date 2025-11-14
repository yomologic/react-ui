#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Find the root package.json (go up one level from site/)
const rootPackagePath = path.join(__dirname, 'package.json');

// Read package.json
const pkg = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

// Set private to true for workspace support
pkg.private = true;

// Write back
fs.writeFileSync(rootPackagePath, JSON.stringify(pkg, null, 2) + '\n');

console.log('✓ Set package.json to private for workspace build');
