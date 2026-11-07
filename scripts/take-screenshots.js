const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { width: 390, height: 844, name: 'screenshot-390.png' },
  { width: 768, height: 1024, name: 'screenshot-768.png' },
  { width: 1440, height: 900, name: 'screenshot-1440.png' },
];

for (const vp of viewports) {
  const dest = path.join(outDir, vp.name);
  const tempDir = path.join(os.tmpdir(), `edge-ss-${vp.width}-${Date.now()}`);
  console.log(`Capturing ${vp.name}...`);
  const cmd = `"${edgePath}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-data-dir="${tempDir}" --window-size=${vp.width},${vp.height} --screenshot="${dest}" http://localhost:3000`;
  try {
    execSync(cmd, { stdio: 'ignore', timeout: 30000 });
    console.log(`Saved ${dest}`);
  } catch (err) {
    console.error(`Failed ${vp.name}:`, err.message);
  }
}
