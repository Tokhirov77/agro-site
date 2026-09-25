// middleware.js
// ВАЖНО: положите этот файл в КОРЕНЬ проекта — рядом с package.json,
// НЕ внутри src/. Vercel находит middleware.js автоматически, для
// любого фреймворка (не только Next.js).
//
// Что делает: если запрос пришёл от поискового бота (Googlebot,
// YandexBot и т.д.), отдаём ему готовый отрендеренный HTML через
// Prerender.io. Обычные посетители получают ваш SPA без изменений —
// скорость и поведение сайта для людей не меняются.

const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "yandex",
  "baiduspider",
  "duckduckbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "telegrambot",
  "whatsapp",
  "applebot",
  "pinterest",
  "slurp",
];

function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

// Не прогоняем через пререндер статику — картинки, JS, CSS и т.п.
const IGNORE_EXTENSIONS =
  /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|xml|txt|woff2?|ttf|map)$/i;

export default async function middleware(request) {
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent") || "";

  // Пропускаем обычных пользователей и статические файлы без изменений
  if (IGNORE_EXTENSIONS.test(url.pathname) || !isBot(userAgent)) {
    return;
  }

  const prerenderUrl = `https://service.prerender.io/${url.origin}${url.pathname}${url.search}`;

  try {
    const prerendered = await fetch(prerenderUrl, {
      headers: {
        "X-Prerender-Token": process.env.PRERENDER_TOKEN,
      },
    });

    if (prerendered.ok) {
      const html = await prerendered.text();
      return new Response(html, {
        status: prerendered.status,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
    // если prerender вернул ошибку — просто отдаём обычный SPA (см. ниже)
  } catch (err) {
    // сервис недоступен — не роняем сайт, отдаём обычный SPA
  }
}

// Матчер: применяем middleware ко всем путям, кроме служебных.
// runtime: "nodejs" — актуальная рекомендация Vercel (edge runtime устарел).
export const config = {
  matcher: "/((?!api).*)",
  runtime: "nodejs",
};