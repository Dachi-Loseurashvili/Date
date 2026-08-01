# National Girlfriend's Day

A static romantic interactive experience built with Next.js App Router,
TypeScript, and Tailwind CSS.

Flow:

1. Password gate with passcode `0722`.
2. Full-screen flower rain transition.
3. Tap-to-swap picture puzzle.
4. Memory photos, local music cards, and a cursive text animation unlock after
   the puzzle is solved.

There is no database, backend, auth provider, external state service, analytics,
or external audio service.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Puzzle Photo

The puzzle image path is:

```text
public/assets/puzzle-photo.jpg
```

Add or replace that file manually when the real couple photo is ready. Use a
square JPG for the cleanest puzzle result.

If the file is missing, the site still renders with a clean placeholder puzzle.

## Editable Content

Edit these constants in `lib/girlfriendDay.ts`:

- `PASSCODE`
- `PUZZLE_IMAGE_SRC`
- `LOVE_SCRIPT_LINES`
- `MEMORY_PHOTOS`
- `PLAYLIST_SONGS`

## Local Audio

Music files live in:

```text
public/audio/
```

Cover images live in:

```text
public/assets/music-covers/
```

Each playlist entry in `PLAYLIST_SONGS` points to one local MP3 and one cover
image. Browsers require a user click before audio plays, so there is no autoplay.

## Privacy

This is not real security. The passcode is a playful client-side gate.

The project includes:

```text
public/robots.txt
```

with:

```text
User-agent: *
Disallow: /
```

The app metadata also sets `noindex` and `nofollow`.

## Deploy to Vercel

1. Push the project to GitHub.
2. Import or redeploy the project in Vercel.
3. Use the default Next.js settings.
4. No environment variables are required.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
