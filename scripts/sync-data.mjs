// Черновики в public/ (mvp/, yandex-card.html) читают данные обычным <script>;
// источник один — src/data.js, копия без export собирается перед сборкой.
import { readFileSync, writeFileSync } from 'node:fs';
const src = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
writeFileSync(new URL('../public/data.js', import.meta.url), '// Сгенерировано из src/data.js, не править\n' + src.replace(/^export /gm, ''));
