# A Little Atlas of Us

A static, mobile-first romantic experience built with Next.js App Router,
TypeScript, and CSS. The page moves through a moonlit introduction, a curated
scrapbook of memories, an interactive keepsake constellation, and a final
paper-style love letter.

There is no database, backend, authentication, analytics, or autoplay media.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit the surprise

All editable copy and progression data lives in:

```text
lib/surpriseContent.ts
```

In that file:

- `PHOTO_MANIFEST` controls image paths, captions, alt text, and framing data.
- `MEMORY_SEQUENCE` controls the gallery order.
- `PAGE_COPY` controls section and interaction copy.
- `KEEPSAKES` controls the tap-to-open cards.
- `FINAL_LETTER` contains the complete love letter in one block.

Browser-ready photo copies live in:

```text
public/assets/memories/
```

The original source photos under `stuff/pics/` are not used at runtime and are
not modified by the app.

## Privacy

The app metadata sets `noindex` and `nofollow`. `public/robots.txt` also asks all
crawlers not to index any route. These controls are advisory, not access
control. After deployment, anything under `public/`, including personal photos,
is still accessible to anyone who has its direct URL.

## Deployment

The existing Vercel/Next.js deployment setup is unchanged. No environment
variables are required.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
