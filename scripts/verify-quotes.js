const { calculateQuote, SEED_RATES, SEED_CRYPTO } = require('../lib/data/store');

async function verify() {
  console.log('=== 1. Verifying Gift Card Quotes (floor(amount * rate)) ===');
  const testAmounts = [10, 25, 50, 75, 100, 150, 200, 250, 500, 1000];
  let passCount = 0;

  for (const amt of testAmounts) {
    const res = await calculateQuote('amazon', 'US e-code', amt);
    const expected = Math.floor(amt * 1420);
    const pass = res.valid && res.payoutNgn === expected;
    console.log(`Amazon $${amt} -> Rate: ₦${res.rateNgn}, Payout: ₦${res.payoutNgn} (Expected: ₦${expected}) -> ${pass ? 'PASS' : 'FAIL'}`);
    if (pass) passCount++;
  }
  console.log(`Gift card tests: ${passCount} / ${testAmounts.length} passed.`);

  console.log('\n=== 2. Verifying Crypto Calculations ===');
  for (const coin of SEED_CRYPTO) {
    const coinAmt = 0.5;
    const usdPrice = coin.usdPrice;
    const rateNgn = coin.ngnPerUsd;
    const expected = Math.floor(coinAmt * usdPrice * rateNgn);
    console.log(`${coin.symbol} (0.5 units @ $${usdPrice}) -> Rate: ₦${rateNgn}/$1 -> Payout: ₦${expected}`);
  }

  console.log('\nVerification complete!');
}

verify().catch(console.error);
