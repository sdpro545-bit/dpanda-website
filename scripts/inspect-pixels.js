const sharp = require('sharp');

async function inspect() {
  const { data, info } = await sharp('Panda Mascot Crypto Asset Sheet.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Dimensions: ${info.width}x${info.height}, channels: ${info.channels}`);
  for (let y = 0; y < 30; y += 4) {
    let row = `Y=${y}: `;
    for (let x = 0; x < 30; x += 4) {
      const idx = (y * info.width + x) * info.channels;
      row += `[${data[idx]},${data[idx + 1]},${data[idx + 2]}] `;
    }
    console.log(row);
  }
}

inspect().catch(console.error);
