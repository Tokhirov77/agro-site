// scripts/prerender.mjs
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { allRoutes } from '../src/routes-list.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticDir = path.join(__dirname, '..', 'dist');

const prerenderer = new Prerenderer({
  staticDir,
  renderer: new PuppeteerRenderer({
    renderAfterTime: 1000, // ждём секунду, чтобы React и Seo успели отрендериться
  }),
});

async function run() {
  console.log('Запускаю пререндер...');
  await prerenderer.initialize();
  const renderedRoutes = await prerenderer.renderRoutes(allRoutes);

  for (const route of renderedRoutes) {
    const outputDir = path.join(staticDir, route.route);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), route.html.trim());
    console.log(`Готово: ${route.route}`);
  }

  await prerenderer.destroy();
  console.log(`Пререндер завершён: ${renderedRoutes.length} страниц`);
}

run().catch((err) => {
  console.error('Ошибка пререндера:', err);
  prerenderer.destroy();
  process.exit(1);
});