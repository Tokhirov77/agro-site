import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allRoutes } from '../src/routes-list.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

for (const route of allRoutes) {
  if (route === '/') continue; // главную страницу не трогаем — index.html в public и так есть
  const srcFile = path.join(distDir, route, 'index.html');
  const destDir = path.join(publicDir, route);
  if (fs.existsSync(srcFile)) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcFile, path.join(destDir, 'index.html'));
    console.log(`Скопировано: ${route}`);
  }
}
console.log('Копирование завершено.');