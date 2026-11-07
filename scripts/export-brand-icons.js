const fs = require("fs");
const path = require("path");
const si = require("simple-icons");

const giftcardsDir = path.join(__dirname, "../public/assets/giftcards");
const cryptoDir = path.join(__dirname, "../public/assets/crypto");

if (!fs.existsSync(giftcardsDir)) fs.mkdirSync(giftcardsDir, { recursive: true });
if (!fs.existsSync(cryptoDir)) fs.mkdirSync(cryptoDir, { recursive: true });

function formatSvg(rawSvg, fill = "#F5F5F7") {
  // Ensure fill attribute is set
  if (rawSvg.includes("<path")) {
    return rawSvg.replace("<path", `<path fill="${fill}"`);
  }
  return rawSvg;
}

function makeMonogramSvg(text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#F5F5F7" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" font-size="10" font-weight="600" letter-spacing="-0.02em">
    ${text}
  </text>
</svg>`;
}

// 1. Steam
fs.writeFileSync(path.join(giftcardsDir, "steam.svg"), formatSvg(si.siSteam.svg));

// 2. Google Play
fs.writeFileSync(path.join(giftcardsDir, "googleplay.svg"), formatSvg(si.siGoogleplay.svg));

// 3. Razer
fs.writeFileSync(path.join(giftcardsDir, "razer.svg"), formatSvg(si.siRazer.svg));

// 4. PlayStation
fs.writeFileSync(path.join(giftcardsDir, "playstation.svg"), formatSvg(si.siPlaystation.svg));

// 5. eBay
fs.writeFileSync(path.join(giftcardsDir, "ebay.svg"), formatSvg(si.siEbay.svg));

// 6. Nike
fs.writeFileSync(path.join(giftcardsDir, "nike.svg"), formatSvg(si.siNike.svg));

// 7. Visa (for Vanilla)
fs.writeFileSync(path.join(giftcardsDir, "vanilla.svg"), formatSvg(si.siVisa.svg));

// Monograms for cards where simple-icons does not have the brand mark (owner to supply)
fs.writeFileSync(path.join(giftcardsDir, "xbox.svg"), makeMonogramSvg("XB"));
fs.writeFileSync(path.join(giftcardsDir, "walmart.svg"), makeMonogramSvg("WM"));
fs.writeFileSync(path.join(giftcardsDir, "sephora.svg"), makeMonogramSvg("SP"));

// BNB crypto icon from simple-icons
fs.writeFileSync(path.join(cryptoDir, "coin-bnb.svg"), formatSvg(si.siBinance.svg, "#F0B90B"));

console.log("Successfully exported all giftcard and crypto SVGs!");
