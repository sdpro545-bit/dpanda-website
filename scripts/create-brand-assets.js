const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createBrandAssets() {
  const brandDir = 'public/assets/brand';
  if (!fs.existsSync(brandDir)) {
    fs.mkdirSync(brandDir, { recursive: true });
  }

  // 1. Resize dPanda Cap print green.png to crisp web icons (512, 192, 64, 32)
  const logoPngPath = 'dPanda Cap print green.png';
  await sharp(logoPngPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(brandDir, 'logo-mark-512.png'));

  await sharp(logoPngPath)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(brandDir, 'favicon.png'));

  // 2. Vector SVG wrapper for logo-mark.svg (embedding base64 of the pristine transparent source)
  const base64Png = (await sharp(logoPngPath)
    .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()).toString('base64');

  const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%" fill="none">
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512" />
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'logo-mark.svg'), logoMarkSvg);
  console.log('Saved brand/logo-mark.svg');

  // 3. Wordmark SVG: "dPanda" with lowercase d and capital P, bold Plus Jakarta Sans geometry
  const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64" fill="none">
  <text x="0" y="46" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.03em" fill="#FFFFFF">
    d<tspan fill="#2DB357">Panda</tspan><tspan fill="#FFD62E" font-size="34">.ng</tspan>
  </text>
</svg>`;
  fs.writeFileSync(path.join(brandDir, 'logo-wordmark.svg'), wordmarkSvg);
  console.log('Saved brand/logo-wordmark.svg');

  // 4. Also generate standard og-image.png (1200x630)
  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#04281A" />
    <circle cx="600" cy="315" r="380" fill="#5CE87A" opacity="0.18" filter="blur(80px)" />
    <text x="600" y="260" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="76" font-weight="800" fill="#FFFFFF" letter-spacing="-0.03em">
      Trade Without Limits
    </text>
    <text x="600" y="340" text-anchor="middle" font-family="'Inter', sans-serif" font-size="28" font-weight="500" fill="#A0FFD2">
      Gift Cards · Crypto Exchange · Locked Wallet Funds
    </text>
    <rect x="490" y="400" width="220" height="56" rx="28" fill="#FFD62E" />
    <text x="600" y="437" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="700" fill="#06361F">
      dPanda.ng
    </text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .png()
    .toFile(path.join(brandDir, 'og-image.png'));
  console.log('Saved brand/og-image.png (1200x630)');
}

createBrandAssets().catch(console.error);
