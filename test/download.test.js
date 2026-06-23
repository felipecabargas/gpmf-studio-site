const test = require('node:test');
const assert = require('node:assert/strict');
const { detectPlatform, formatBytes, findAssetByName } = require('../download.js');

test('detectPlatform recognizes macOS user agents', () => {
  assert.equal(detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'), 'mac');
});

test('detectPlatform recognizes Windows user agents', () => {
  assert.equal(detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64)'), 'win');
});

test('detectPlatform recognizes Linux user agents but not Android', () => {
  assert.equal(detectPlatform('Mozilla/5.0 (X11; Linux x86_64)'), 'linux');
  assert.equal(detectPlatform('Mozilla/5.0 (Linux; Android 14)'), null);
});

test('detectPlatform returns null for unrecognized or missing input', () => {
  assert.equal(detectPlatform('some unknown agent'), null);
  assert.equal(detectPlatform(undefined), null);
});

test('formatBytes renders human-readable sizes', () => {
  assert.equal(formatBytes(0), '0 B');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(1024), '1.0 KB');
  assert.equal(formatBytes(86507520), '82.5 MB');
});

test('formatBytes rejects invalid input', () => {
  assert.equal(formatBytes(-1), null);
  assert.equal(formatBytes(NaN), null);
  assert.equal(formatBytes('82MB'), null);
});

test('findAssetByName finds a matching asset by exact name', () => {
  const assets = [
    { name: 'GPMF-Studio-mac-arm64.dmg', size: 86507520 },
    { name: 'GPMF-Studio-win-x64.exe', size: 75000000 },
  ];
  assert.deepEqual(findAssetByName(assets, 'GPMF-Studio-win-x64.exe'), assets[1]);
  assert.equal(findAssetByName(assets, 'missing.dmg'), undefined);
});

test('findAssetByName handles non-array input', () => {
  assert.equal(findAssetByName(undefined, 'x'), undefined);
});

test('detectPlatform exposes functions as globals for non-module script-tag use', () => {
  assert.equal(typeof globalThis.detectPlatform, 'function');
  assert.equal(typeof globalThis.formatBytes, 'function');
  assert.equal(typeof globalThis.findAssetByName, 'function');
});

test('detectPlatform returns null for iOS user agents instead of misclassifying as mac', () => {
  assert.equal(detectPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'), null);
  assert.equal(detectPlatform('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15'), null);
});

test('formatBytes renders terabyte-scale sizes correctly', () => {
  assert.equal(formatBytes(1099511627776), '1.0 TB');
});
