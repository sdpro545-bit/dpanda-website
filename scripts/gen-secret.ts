import crypto from "crypto";

const slug = crypto.randomBytes(16).toString("hex"); // 32 hex chars
const jwtSecret = crypto.randomBytes(32).toString("hex"); // 64 hex chars

console.log("\n==========================================");
console.log("dPanda Secret Keys Generator");
console.log("==========================================");
console.log(`ADMIN_SLUG=${slug}`);
console.log(`ADMIN_JWT_SECRET=${jwtSecret}`);
console.log("==========================================");
console.log("Copy these lines into your production .env or Vercel dashboard.\n");
