import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'assets', 'qr');

const targets = [
  { file: 'bio-link.svg', url: 'https://bio.link/gladwin_dr' },
  { file: 'linkedin.svg', url: 'https://www.linkedin.com/in/gladwindr/' },
  { file: 'facebook.svg', url: 'https://www.facebook.com/gfdelrosario0402/' },
  { file: 'portfolio.svg', url: 'https://glides-dev.vercel.app/' },
  { file: 'presentation.svg', url: 'https://azuredeployments-gladwindr.vercel.app/' },
];

mkdirSync(outDir, { recursive: true });

for (const { file, url } of targets) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: { dark: '#0a0a0aff', light: '#ffffffff' },
  });
  writeFileSync(join(outDir, file), svg, 'utf8');
  console.log(`wrote ${file} -> ${url}`);
}
