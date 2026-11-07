const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function extractAssets() {
  const inputPath = 'public/assets/extracted/sheet-transparent.png';
  const outDir3D = 'public/assets/3d';
  if (!fs.existsSync(outDir3D)) {
    fs.mkdirSync(outDir3D, { recursive: true });
  }

  // Exact bounds computed from transparent alpha mask
  const assetBoxes = [
    {
      id: 'panda-standing-front',
      box: { left: 30, top: 12, width: 360, height: 565 },
      targets: ['panda-standing.webp', 'panda-standing.png']
    },
    {
      id: 'panda-standing-profile',
      box: { left: 430, top: 15, width: 290, height: 565 },
      targets: ['panda-profile.webp', 'panda-profile.png']
    },
    {
      id: 'panda-standing-back',
      box: { left: 714, top: 14, width: 336, height: 566 },
      targets: ['panda-back.webp', 'panda-back.png']
    },
    {
      id: 'panda-seated-phone',
      box: { left: 1030, top: 40, width: 490, height: 540 },
      targets: ['panda-phone.webp', 'panda-phone.png', 'panda-chair.webp', 'panda-chair.png']
    },
    {
      id: 'coin-btc',
      box: { left: 75, top: 600, width: 205, height: 198 },
      targets: ['coin-btc.webp', 'coin-btc.png']
    },
    {
      id: 'coin-usdt',
      box: { left: 344, top: 625, width: 188, height: 178 },
      targets: ['coin-usdt.webp', 'coin-usdt.png']
    },
    {
      id: 'coin-btc-dark',
      box: { left: 215, top: 780, width: 145, height: 155 },
      targets: ['coin-btc-dark.webp', 'coin-btc-dark.png', 'coin-btc-gold.webp']
    },
    {
      id: 'coin-eth',
      box: { left: 495, top: 735, width: 165, height: 175 },
      targets: ['coin-eth.webp', 'coin-eth.png']
    },
    {
      id: 'card-amazon',
      box: { left: 660, top: 605, width: 235, height: 170 },
      targets: ['card-amazon.webp', 'card-amazon.png']
    },
    {
      id: 'card-generic-blue',
      box: { left: 900, top: 670, width: 235, height: 175 },
      targets: ['card-generic-blue.webp', 'card-generic-blue.png', 'card-itunes.webp', 'card-itunes.png']
    },
    {
      id: 'light-orbit-ring',
      box: { left: 400, top: 590, width: 1125, height: 390 },
      targets: ['light-orbit-ring.webp', 'light-orbit-ring.png']
    }
  ];

  for (const asset of assetBoxes) {
    console.log(`Extracting ${asset.id} with box ${JSON.stringify(asset.box)}...`);
    const pipeline = sharp(inputPath).extract(asset.box);

    for (const target of asset.targets) {
      const outPath = path.join(outDir3D, target);
      if (target.endsWith('.webp')) {
        await pipeline.clone().webp({ quality: 95, effort: 6 }).toFile(outPath);
      } else {
        await pipeline.clone().png({ compressionLevel: 9 }).toFile(outPath);
      }
      console.log(`  -> Saved ${outPath}`);
    }
  }

  console.log('All individual assets successfully extracted to /public/assets/3d/!');
}

extractAssets().catch(console.error);
