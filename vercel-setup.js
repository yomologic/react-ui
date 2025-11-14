#!/usr/bin/env node
const fs = require('fs');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Set private to true for workspace support
pkg.private = true;

// Write back
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');

console.log('✓ Set package.json to private for workspace build');
