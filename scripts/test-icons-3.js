const si = require("simple-icons");
console.log("Check siAmazon:", Boolean(si.siAmazon));
console.log("Check siXbox:", Boolean(si.siXbox));
console.log("Check siWalmart:", Boolean(si.siWalmart));
console.log("Check siSephora:", Boolean(si.siSephora));

// Let's search slugs or check why they didn't show
for (const [k, v] of Object.entries(si)) {
  if (k.toLowerCase().includes("amazon") || k.toLowerCase().includes("xbox") || k.toLowerCase().includes("walmart") || k.toLowerCase().includes("sephora")) {
    console.log("Found key:", k, v.title, v.slug);
  }
}
