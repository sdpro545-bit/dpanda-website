const si = require("simple-icons");

const targets = [
  "amazon", "apple", "itunes", "steam", "googleplay", "razer",
  "xbox", "playstation", "walmart", "ebay", "sephora", "nike",
  "visa", "binance"
];

for (const t of targets) {
  const matches = Object.keys(si).filter(k => k.toLowerCase().includes(t));
  console.log(t, ":", matches.slice(0, 5));
}
