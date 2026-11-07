async function runTests() {
  const routes = [
    "/",
    "/gift-cards",
    "/crypto",
    "/how-it-works",
    "/faq",
    "/contact",
    "/locked-wallet-funds",
    "/terms",
    "/privacy",
    "/api/rates/giftcards",
    "/api/rates/crypto",
    "/api/settings/public",
  ];

  console.log("--- Testing GET Routes ---");
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(`${r.padEnd(25)} => Status: ${res.status}`);
    } catch (e) {
      console.error(`${r.padEnd(25)} => FAILED: ${e.message}`);
    }
  }

  console.log("\n--- Testing POST /api/quote ---");
  try {
    const res = await fetch("http://localhost:3000/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardSlug: "amazon",
        variant: "US e-code",
        amount: 100,
      }),
    });
    const data = await res.json();
    console.log("POST /api/quote Status:", res.status);
    console.log("Quote response:", JSON.stringify(data));
  } catch (e) {
    console.error("Quote test failed:", e.message);
  }
}

runTests();
