const bcrypt = require("bcryptjs");

const password = process.argv[2] || "dpanda-admin-2026";
const rounds = 12;

bcrypt.hash(password, rounds).then((hash) => {
  console.log("\n==========================================");
  console.log("dPanda Admin Password Hash Generator");
  console.log("==========================================");
  console.log(`Password: ${password}`);
  console.log(`Bcrypt Hash (rounds: ${rounds}):`);
  console.log(hash);
  console.log("==========================================");
  console.log("Set this in your environment as:");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
});
