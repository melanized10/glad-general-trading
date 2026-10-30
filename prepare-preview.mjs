
import fs from 'node:fs';
import path from 'node:path';

const jsonPath = path.resolve('seed/public-content.json');
const sourceDir = path.resolve('public/assets/uploads');
const targetDir = path.resolve('public/assets/preview');

const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

fs.mkdirSync(targetDir, { recursive: true });

let copied = 0;
const missing = [];

for (const item of content.items) {
  if (!item.image) continue;

  // Only accept image references from our upload directory.
  if (!/^\/assets\/uploads\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp)$/i.test(item.image)) {
    throw new Error(`Unexpected image reference for ${item.title}`);
  }

  const filename = path.basename(item.image);
  const source = path.join(sourceDir, filename);
  const destination = path.join(targetDir, filename);

  if (!fs.existsSync(source)) {
    missing.push(filename);
    continue;
  }

  fs.copyFileSync(source, destination);
  item.image = '/assets/preview/' + filename;
  copied++;
}

if (missing.length) {
  console.error('Missing images:', missing);
  process.exitCode = 1;
} else {
  fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2));
  console.log('Public preview photographs:', copied);
  console.log('Public content prepared successfully.');
}
