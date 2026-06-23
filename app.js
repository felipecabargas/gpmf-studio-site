(function () {
  const RELEASES_API = 'https://api.github.com/repos/felipecabargas/gpmf-studio-releases/releases/latest';
  const ASSET_NAMES = {
    'mac-arm64': 'GPMF-Studio-mac-arm64.dmg',
    'mac-x64': 'GPMF-Studio-mac-x64.dmg',
    'win-x64': 'GPMF-Studio-win-x64.exe',
    'linux-x64': 'GPMF-Studio-linux-x64.AppImage',
  };
  const PLATFORM_LABELS = { mac: 'macOS', win: 'Windows', linux: 'Linux' };
  const PLATFORM_DEFAULT_DOWNLOAD = { mac: 'mac-arm64', win: 'win-x64', linux: 'linux-x64' };

  function highlightPlatform() {
    const platform = detectPlatform(navigator.userAgent);
    if (!platform) return;

    const card = document.querySelector(`[data-platform-card="${platform}"]`);
    if (card) card.classList.add('platform-card--detected');

    const heroButton = document.querySelector('[data-hero-download]');
    const downloadKey = PLATFORM_DEFAULT_DOWNLOAD[platform];
    const heroTarget = document.querySelector(`[data-download="${downloadKey}"]`);
    if (heroButton && heroTarget) {
      heroButton.href = heroTarget.href;
      heroButton.textContent = `Download for ${PLATFORM_LABELS[platform]}`;
    }
  }

  function applyVersionAndSizes(release) {
    const versionBadge = document.querySelector('[data-version-badge]');
    if (versionBadge && release.tag_name) {
      versionBadge.textContent = release.tag_name;
    }
    Object.entries(ASSET_NAMES).forEach(([key, filename]) => {
      const asset = findAssetByName(release.assets, filename);
      const sizeEl = document.querySelector(`[data-size="${key}"]`);
      if (sizeEl && asset) {
        const formatted = formatBytes(asset.size);
        if (formatted) sizeEl.textContent = `(${formatted})`;
      }
    });
  }

  function loadReleaseInfo() {
    fetch(RELEASES_API)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('bad response'))))
      .then(applyVersionAndSizes)
      .catch(() => { /* progressive enhancement only — download links work without this */ });
  }

  document.addEventListener('DOMContentLoaded', () => {
    highlightPlatform();
    loadReleaseInfo();
  });
})();
