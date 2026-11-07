const sharp = require('sharp');
const fs = require('fs');

async function testFloodFill() {
  const { data, info } = await sharp('Panda Mascot Crypto Asset Sheet.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const isBgPixel = (x, y) => {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    // Background is near-neutral light gray or white
    return min > 190 && (max - min) <= 22;
  };

  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary points
  for (let x = 0; x < width; x++) {
    if (isBgPixel(x, 0)) { visited[x] = 1; queue.push(x); }
    if (isBgPixel(x, height - 1)) { visited[(height - 1) * width + x] = 1; queue.push((height - 1) * width + x); }
  }
  for (let y = 0; y < height; y++) {
    if (isBgPixel(0, y)) { visited[y * width] = 1; queue.push(y * width); }
    if (isBgPixel(width - 1, y)) { visited[y * width + (width - 1)] = 1; queue.push(y * width + (width - 1)); }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nidx = ny * width + nx;
        if (!visited[nidx] && isBgPixel(nx, ny)) {
          visited[nidx] = 1;
          queue.push(nidx);
        }
      }
    }
  }

  console.log(`Flood fill completed. Background pixels identified: ${head} / ${width * height} (${((head / (width * height)) * 100).toFixed(1)}%)`);

  // Create RGBA image with alpha = 0 for background
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const src = i * 3;
    const dst = i * 4;
    rgba[dst] = data[src];
    rgba[dst + 1] = data[src + 1];
    rgba[dst + 2] = data[src + 2];
    rgba[dst + 3] = visited[i] ? 0 : 255;
  }

  if (!fs.existsSync('public/assets/extracted')) {
    fs.mkdirSync('public/assets/extracted', { recursive: true });
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/assets/extracted/sheet-transparent.png');

  console.log('Saved transparent sheet to public/assets/extracted/sheet-transparent.png');
}

testFloodFill().catch(console.error);
