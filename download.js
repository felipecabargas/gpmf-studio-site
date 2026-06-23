'use strict';

function detectPlatform(userAgent) {
  if (typeof userAgent !== 'string') return null;
  const ua = userAgent.toLowerCase();
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return null;
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('win')) return 'win';
  if (ua.includes('linux') && !ua.includes('android')) return 'linux';
  return null;
}

function formatBytes(bytes) {
  if (typeof bytes !== 'number' || !Number.isFinite(bytes) || bytes < 0) return null;
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  const formatted = exponent === 0 ? String(value) : value.toFixed(1);
  return `${formatted} ${units[exponent]}`;
}

function findAssetByName(assets, name) {
  if (!Array.isArray(assets)) return undefined;
  return assets.find((asset) => asset && asset.name === name);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { detectPlatform, formatBytes, findAssetByName };
}
if (typeof globalThis !== 'undefined') {
  globalThis.detectPlatform = detectPlatform;
  globalThis.formatBytes = formatBytes;
  globalThis.findAssetByName = findAssetByName;
}
