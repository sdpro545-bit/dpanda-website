const si = require("simple-icons");
const entries = Object.entries(si);

const searchTerms = ["amazon", "xbox", "walmart", "sephora", "binance", "visa", "steam", "playstation", "nike", "ebay", "razer", "google play", "apple", "itunes"];

for (const term of searchTerms) {
  const matches = entries.filter(([k, v]) => v && v.title && v.title.toLowerCase().includes(term));
  console.log(`Term "${term}":`, matches.map(([k, v]) => `${k} (${v.title})`));
}
