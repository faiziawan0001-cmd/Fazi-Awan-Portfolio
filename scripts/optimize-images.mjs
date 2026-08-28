import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const jobs = [
  { src: 'assets/avatar-1.png', out: 'assets/avatar-1', w: 160 },
  { src: 'assets/avatar-2.png', out: 'assets/avatar-2', w: 160 },
  { src: 'assets/avatar-3.png', out: 'assets/avatar-3', w: 160 },
  { src: 'assets/avatar-4.png', out: 'assets/avatar-4', w: 160 },
  { src: 'assets/hero-bg.png', out: 'assets/hero-bg', w: 1600 },
  { src: 'assets/smartchat-thumbnail.png', out: 'assets/smartchat-thumbnail', w: 900 }
];

for (const j of jobs) {
  const src = path.join(root, j.src);
  const meta = await sharp(src).metadata();
  const img = sharp(src).resize(j.w);
  await img.clone().avif({ quality: 58, effort: 4 }).toFile(path.join(root, j.out + '.avif'));
  await img.clone().webp({ quality: 82 }).toFile(path.join(root, j.out + '.webp'));
  const avif = (await sharp(path.join(root, j.out + '.avif')).metadata()).size;
  const webp = (await sharp(path.join(root, j.out + '.webp')).metadata()).size;
  const orig = meta.size;
  console.log(
    `${j.src.padEnd(34)} ${meta.width}x${meta.height}  ` +
    `orig ${(orig / 1024).toFixed(0)}KB -> avif ${(avif / 1024).toFixed(0)}KB / webp ${(webp / 1024).toFixed(0)}KB`
  );
}
