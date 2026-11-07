const sharp = require("sharp");
const path = require("path");

async function processFavicon() {
  const inputPath = path.join(__dirname, "../dPanda Favicon logo.png");
  const brandDir = path.join(__dirname, "../public/assets/brand");

  console.log("Reading and trimming dPanda Favicon logo.png...");

  const trimmed = await sharp(inputPath)
    .trim()
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  console.log(`Trimmed size: ${meta.width}x${meta.height}`);

  // 1. logo-mark.png (512x512)
  await sharp(trimmed)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(brandDir, "logo-mark.png"));

  // 2. favicon.png (64x64)
  await sharp(trimmed)
    .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(brandDir, "favicon.png"));

  // 3. logo-mark.webp (512x512)
  await sharp(trimmed)
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile(path.join(brandDir, "logo-mark.webp"));

  console.log("Successfully generated brand logo-mark and favicon from dPanda Favicon logo.png!");
}

processFavicon().catch(console.error);
