/**
 * Удаляет front/.next по абсолютному пути (не зависит от cwd npm/concurrently).
 * Иначе после `next build` + `next dev` часто 404 на /_next/static/css/app/layout.css:
 * страница как «белый экран» / голый HTML без Tailwind (ссылки синие, без карточек).
 * Для разработки используйте `npm run dev` из папки `front/` (скрипт сам удаляет .next перед `next dev`).
 * Не вызывайте голый `next dev` после `next build` — снова получите 404 на CSS.
 * Если у npm включён `ignore-scripts=true`, lifecycle-хуки не помогут; в проекте есть `front/.npmrc` с `ignore-scripts=false`.
 */
import { rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nextDir = join(root, ".next");
try {
  rmSync(nextDir, { recursive: true, force: true });
} catch {
  /* ignore */
}
