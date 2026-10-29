# Somewhere, only us.

An interactive, five-chapter keepsake for Ninutsi, built with Next.js and React. The page is statically rendered and runs entirely in the browser. No backend, database, account, API key, or environment configuration is required.

The experience opens with a personal record player. **Turn the music on** starts the supplied _Always Forever_ by Cults; a second press enters the world. A quieter entrance is also available. Playback continues across chapters, with a prominent sound control in the header.

1. **The invitation:** a floating photo collage and a doorway into the world.
2. **The memory sky:** a rotating photo sphere. Drag it in two dimensions, use the arrow controls, or open any photograph.
3. **A little light:** brush across a faded photograph to develop it. A button provides the same reveal without drawing.
4. **The little things:** handmade objects form a constellation as they are discovered. Trace between them with a mouse, or open each one.
5. **A little closer:** move the two stars together, directly or with the slider. The scene becomes a night sky of photographs, with a keepsake note preserving the original Georgian letter.

The sky responds to the music when Web Audio is available. Audio playback works without visual analysis. Canvas effects are bounded, pause in background tabs, and respect reduced motion; scene transitions have a motion-free fallback. Dialogs support Escape, arrow keys, and focus restoration.

## Past versions

The sticky header has a large, labelled **Past versions · 3** dropdown on every screen. On phones it occupies its own full-width row. It opens three restored, self-contained pages:

- **Flowers**: `/versions/flowers` — `9f5a161e580aebf483009a800e5921eb2f474539`
- **Girlfriend’s day**: `/versions/girlfriends-day` — `ac1af7a4cad362bd47a10180d6c985646fff22c9`
- **Our little story**: `/versions/our-little-story` — `82a91ab6b09078ec638840dd833086b7e84fa048` (`grammar mistake fix`)

Each archive has its original design, text, images, and music, plus a **Back to now** link. The original Girlfriend’s day password and puzzle are preserved. The archived Flowers form is a local preview and sends nothing.

Snapshots live in `legacy/`, their assets in `public/versions/`, and the menu data in `lib/versions.ts`. See [archive notes](legacy/README.md) for provenance and compatibility changes. The current root page and layout live in `app/(present)/`; the URL remains `/`.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit

- `lib/universe.ts`: photographs, captions, keepsakes, and chapter labels.
- `components/universe/`: scenes, shared artwork, native dialogs, sound, and canvas effects.
- `app/globals.css`: common typography, the invitation, reunion, and dialogs.
- `app/experience.css`: record player, photo sphere, darkroom, constellation, and transitions.
- `lib/surpriseContent.ts`: the original Georgian letter (`FINAL_LETTER`).
- `public/assets/universe/`: local WebP photographs.
- `public/fonts/`: local fonts and licenses.
- `public/audio/always-forever.mp3`: the optional soundtrack.

The originals in the ignored `stuff/` directory are not needed at runtime. All required assets are in `public/`. No runtime third-party requests are used.

## Deploy

Commit and push the project, including the assets in `public/`, to the existing GitHub repository. Vercel uses the existing Next.js configuration and `npm run build`. No hosting changes or additional services are required.

The site requests no search indexing. It has no access control; the site and photographs are visible to anyone with the URL.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
