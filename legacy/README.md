# Earlier chapters

These are independent source snapshots from the exact commits requested for the archive. The current experience does not import their content or styles.

| Page                         | Original commit       | Source                                     |
| ---------------------------- | --------------------- | ------------------------------------------ |
| `/versions/flowers`          | `flowers`             | `9f5a161e580aebf483009a800e5921eb2f474539` |
| `/versions/girlfriends-day`  | `girlfriend's day`    | `ac1af7a4cad362bd47a10180d6c985646fff22c9` |
| `/versions/our-little-story` | `grammar mistake fix` | `82a91ab6b09078ec638840dd833086b7e84fa048` |

Only the entry page and its reachable components and content are restored. Each snapshot has its own copy of its original text, including the older letter, and its own assets under `public/versions/<slug>/`.

Compatibility changes:

- Imports point to the corresponding snapshot under `legacy/`.
- Public asset URLs point to that snapshot's assets. Next.js images use the local files directly with `unoptimized`.
- Flowers validates its date form locally and shows the original confirmation screen. It does not call the former API or send webhooks. The form identifies itself as an archived preview.
- Former analytics code and API routes are not restored.
- A shared archive toolbar provides version navigation and a link back to the current experience.

The App Router uses a separate root layout for the current experience and each archive. Version links use full document navigation so global styles, animation state, and audio do not carry over between designs. Keep this boundary when adding an archive.

All source and assets are committed with the app. Deployment does not fetch Git history, contact GitHub, or depend on old Vercel deployment URLs. No extra services or dependencies are needed.
