const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outDir = path.join(__dirname, "../public/assets/3d");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function createAssets() {
  console.log("Generating reference 3D tiles and graphics...");

  // 1. tile-clock (Large slab tile with clock icon, 3D perspective appearance)
  const clockSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="slabGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#0f4429" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#051f13" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#02100a" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="rimMint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a0ffd2" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#5ce87a" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#14532d" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="iconMint" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e4fff1" />
          <stop offset="100%" stop-color="#5ce87a" />
        </linearGradient>
        <filter id="tileShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.75" />
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#5ce87a" flood-opacity="0.25" />
        </filter>
      </defs>

      <!-- Slab Body -->
      <g transform="translate(40, 40) rotate(-4 160 160)" filter="url(#tileShadow)">
        <rect x="20" y="20" width="280" height="280" rx="64" fill="url(#slabGlow)" stroke="url(#rimMint)" stroke-width="3" />
        <!-- Gloss highlight on top edge -->
        <path d="M 84 22 L 236 22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.4" />
        <!-- Inner luminous circle -->
        <circle cx="160" cy="160" r="90" fill="#042013" stroke="#2db357" stroke-width="4" opacity="0.8" />
        <!-- Clock hands & marks -->
        <circle cx="160" cy="160" r="8" fill="url(#iconMint)" />
        <line x1="160" y1="160" x2="160" y2="105" stroke="url(#iconMint)" stroke-width="10" stroke-linecap="round" />
        <line x1="160" y1="160" x2="205" y2="160" stroke="url(#iconMint)" stroke-width="9" stroke-linecap="round" />
        <!-- Tick marks -->
        <circle cx="160" cy="85" r="4" fill="#a0ffd2" />
        <circle cx="235" cy="160" r="4" fill="#a0ffd2" />
        <circle cx="160" cy="235" r="4" fill="#a0ffd2" />
        <circle cx="85" cy="160" r="4" fill="#a0ffd2" />
      </g>
    </svg>
  `;

  await sharp(Buffer.from(clockSvg)).png().toFile(path.join(outDir, "tile-clock.png"));
  await sharp(Buffer.from(clockSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "tile-clock.webp"));

  // 2. tile-chat (Large slab tile with WhatsApp/chat icon)
  const chatSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="slabGlow2" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#0f4429" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#051f13" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#02100a" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="rimMint2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a0ffd2" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#5ce87a" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#14532d" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="iconMint2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#e4fff1" />
          <stop offset="100%" stop-color="#5ce87a" />
        </linearGradient>
        <filter id="tileShadow2" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.75" />
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#5ce87a" flood-opacity="0.25" />
        </filter>
      </defs>

      <g transform="translate(40, 40) rotate(5 160 160)" filter="url(#tileShadow2)">
        <rect x="20" y="20" width="280" height="280" rx="64" fill="url(#slabGlow2)" stroke="url(#rimMint2)" stroke-width="3" />
        <path d="M 84 22 L 236 22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.4" />
        <!-- Chat Bubble -->
        <g transform="translate(100, 100)">
          <path d="M 60 10 C 26 10 0 34 0 65 C 0 81 7 95 19 105 L 10 135 L 42 124 C 48 126 54 127 60 127 C 94 127 120 103 120 72 C 120 41 94 10 60 10 Z" fill="url(#iconMint2)" />
          <circle cx="36" cy="68" r="8" fill="#04281A" />
          <circle cx="60" cy="68" r="8" fill="#04281A" />
          <circle cx="84" cy="68" r="8" fill="#04281A" />
        </g>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(chatSvg)).png().toFile(path.join(outDir, "tile-chat.png"));
  await sharp(Buffer.from(chatSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "tile-chat.webp"));

  // 3. tile-check (Smaller slab with checkmark)
  const checkSvg = `
    <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="checkGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#0f4429" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#03180f" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect x="20" y="20" width="200" height="200" rx="48" fill="url(#checkGlow)" stroke="#5ce87a" stroke-width="2.5" />
      <path d="M 70 120 L 105 155 L 175 85" fill="none" stroke="#a0ffd2" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  await sharp(Buffer.from(checkSvg)).png().toFile(path.join(outDir, "tile-check.png"));
  await sharp(Buffer.from(checkSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "tile-check.webp"));

  // 4. tile-generic (Neutral slab for carousel cards)
  const genericSvg = `
    <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="genGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#14532d" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#052818" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#02120a" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="genRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5ce87a" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#14532d" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="15" y="15" width="210" height="210" rx="52" fill="url(#genGlow)" stroke="url(#genRim)" stroke-width="2.5" />
    </svg>
  `;

  await sharp(Buffer.from(genericSvg)).png().toFile(path.join(outDir, "tile-generic.png"));
  await sharp(Buffer.from(genericSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "tile-generic.webp"));

  // 5. shape-diamond-1, 2, 3 (Frosted translucent rounded squares for background)
  for (let i = 1; i <= 3; i++) {
    const opacity = (0.04 + i * 0.02).toFixed(2);
    const borderOp = (0.08 + i * 0.03).toFixed(2);
    const diamondSvg = `
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="35" y="35" width="230" height="230" rx="54" fill="rgba(255,255,255,${opacity})" stroke="rgba(160,255,210,${borderOp})" stroke-width="1.5" transform="rotate(45 150 150)" />
      </svg>
    `;
    await sharp(Buffer.from(diamondSvg)).png().toFile(path.join(outDir, `shape-diamond-${i}.png`));
    await sharp(Buffer.from(diamondSvg)).webp({ quality: 90 }).toFile(path.join(outDir, `shape-diamond-${i}.webp`));
  }

  // 6. shape-pixel-cluster (Stair pattern of dark rounded squares)
  const pixelClusterSvg = `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="45" height="45" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
      <rect x="75" y="20" width="45" height="45" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
      <rect x="75" y="75" width="45" height="45" rx="10" fill="rgba(92,232,122,0.15)" stroke="rgba(92,232,122,0.3)" />
      <rect x="130" y="75" width="45" height="45" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
      <rect x="130" y="130" width="45" height="45" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" />
    </svg>
  `;
  await sharp(Buffer.from(pixelClusterSvg)).png().toFile(path.join(outDir, "shape-pixel-cluster.png"));
  await sharp(Buffer.from(pixelClusterSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "shape-pixel-cluster.webp"));

  // 7. particle (16x16 soft glowing round sprite)
  const particleSvg = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
          <stop offset="40%" stop-color="#a0ffd2" stop-opacity="0.8" />
          <stop offset="80%" stop-color="#5ce87a" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#5ce87a" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#pGlow)" />
    </svg>
  `;
  await sharp(Buffer.from(particleSvg)).png().toFile(path.join(outDir, "particle.png"));
  await sharp(Buffer.from(particleSvg)).webp({ quality: 95 }).toFile(path.join(outDir, "particle.webp"));

  // 8. coin-sol (Solana coin matching the 4 supplied coins)
  const solSvg = `
    <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coinEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14F195" />
          <stop offset="50%" stop-color="#9945FF" />
          <stop offset="100%" stop-color="#0b1b14" />
        </linearGradient>
        <radialGradient id="coinFace" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#1a2f26" />
          <stop offset="60%" stop-color="#091811" />
          <stop offset="100%" stop-color="#020905" />
        </radialGradient>
        <linearGradient id="solGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00FFA3" />
          <stop offset="50%" stop-color="#DC1FFF" />
          <stop offset="100%" stop-color="#7928CA" />
        </linearGradient>
        <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
          <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#14F195" flood-opacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#coinShadow)">
        <!-- Outer Coin Rim -->
        <circle cx="150" cy="150" r="125" fill="#0c1e15" stroke="url(#coinEdge)" stroke-width="12" />
        <circle cx="150" cy="150" r="115" fill="url(#coinFace)" stroke="#14F195" stroke-width="2.5" opacity="0.85" />
        <!-- Solana 3 Slanted Bars -->
        <g transform="translate(85, 95)">
          <!-- Top bar -->
          <path d="M 12 0 L 118 0 L 106 20 L 0 20 Z" fill="url(#solGrad)" />
          <!-- Middle bar -->
          <path d="M 0 45 L 106 45 L 118 65 L 12 65 Z" fill="url(#solGrad)" />
          <!-- Bottom bar -->
          <path d="M 12 90 L 118 90 L 106 110 L 0 110 Z" fill="url(#solGrad)" />
        </g>
      </g>
    </svg>
  `;
  await sharp(Buffer.from(solSvg)).png().toFile(path.join(outDir, "coin-sol.png"));
  await sharp(Buffer.from(solSvg)).webp({ quality: 95 }).toFile(path.join(outDir, "coin-sol.webp"));

  // 9. beam-haze (2400x1200 fanning vertical light beams)
  const beamSvg = `
    <svg width="2400" height="1200" viewBox="0 0 2400 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="stageGlow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stop-color="#0b5e32" stop-opacity="0.45" />
          <stop offset="40%" stop-color="#04281a" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#021008" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="beam1" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stop-color="#5ce87a" stop-opacity="0.35" />
          <stop offset="60%" stop-color="#a0ffd2" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#a0ffd2" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="beam2" x1="50%" y1="100%" x2="20%" y2="0%">
          <stop offset="0%" stop-color="#2db357" stop-opacity="0.30" />
          <stop offset="70%" stop-color="#5ce87a" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#5ce87a" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="beam3" x1="50%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stop-color="#2db357" stop-opacity="0.30" />
          <stop offset="70%" stop-color="#5ce87a" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#5ce87a" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Radial stage glow -->
      <rect x="0" y="0" width="2400" height="1200" fill="url(#stageGlow)" />

      <!-- Center Vertical Beams -->
      <polygon points="1100,1200 1300,1200 1380,0 1020,0" fill="url(#beam1)" />
      <!-- Left Fanning Beams -->
      <polygon points="1050,1200 1200,1200 750,0 520,0" fill="url(#beam2)" />
      <polygon points="1020,1200 1140,1200 300,0 120,0" fill="url(#beam2)" opacity="0.6" />
      <!-- Right Fanning Beams -->
      <polygon points="1200,1200 1350,1200 1880,0 1650,0" fill="url(#beam3)" />
      <polygon points="1260,1200 1380,1200 2280,0 2100,0" fill="url(#beam3)" opacity="0.6" />
    </svg>
  `;
  await sharp(Buffer.from(beamSvg)).png().toFile(path.join(outDir, "beam-haze.png"));
  await sharp(Buffer.from(beamSvg)).webp({ quality: 90 }).toFile(path.join(outDir, "beam-haze.webp"));

  console.log("All reference 3D assets generated successfully!");
}

createAssets().catch(console.error);
