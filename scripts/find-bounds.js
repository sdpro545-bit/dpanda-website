const sharp = require('sharp');

async function findClusters() {
  const { data, info } = await sharp('public/assets/extracted/sheet-transparent.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  console.log(`Analyzing ${width}x${height}...`);

  // Let's divide into coarse grid and find non-empty bounds
  // Pandas are Y < 580
  // Items are Y >= 560
  
  // Panda 1: X in [0, 400]
  // Panda 2: X in [400, 700]
  // Panda 3: X in [700, 1050]
  // Panda 4: X in [1050, 1536]

  function getBounds(x1, y1, x2, y2) {
    let minX = width, maxX = 0, minY = height, maxY = 0;
    let count = 0;
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const a = data[(y * width + x) * 4 + 3];
        if (a > 30) {
          count++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1, count };
  }

  console.log('Panda Front Thumbs:', getBounds(0, 0, 420, 580));
  console.log('Panda Profile Thumbs:', getBounds(420, 0, 720, 580));
  console.log('Panda Back:', getBounds(700, 0, 1050, 580));
  console.log('Panda Seated Phone:', getBounds(1030, 0, 1535, 580));

  // Bottom items
  console.log('Orange BTC:', getBounds(50, 580, 300, 800));
  console.log('Teal USDT:', getBounds(320, 590, 530, 800));
  console.log('Dark BTC:', getBounds(180, 750, 380, 950));
  console.log('Silver ETH:', getBounds(470, 710, 680, 930));
  console.log('Amazon Card:', getBounds(640, 570, 920, 800));
  console.log('iTunes Card:', getBounds(880, 640, 1160, 880));
  console.log('Light Orbit Ring:', getBounds(350, 580, 1535, 980));
}

findClusters().catch(console.error);
