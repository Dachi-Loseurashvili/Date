# Date Invitation

A small playful one-page dating invitation built with Next.js App Router,
TypeScript, and Tailwind CSS. It has no database, no auth, and one optional
serverless webhook integration.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Optional variable:

```bash
DATE_PLAN_WEBHOOK_URL=
```

## Receiving Submissions

When the visitor clicks `Lock in the mission`, the app sends this payload to
`POST /api/plan`:

```json
{
  "dateType": "Coffee",
  "selectedDate": "2026-06-12",
  "selectedTime": "19:30",
  "submittedAt": "2026-05-31T16:30:00.000Z"
}
```

The planner only accepts dates from `2026-01-01` through `2026-12-31`.

If `DATE_PLAN_WEBHOOK_URL` is configured, the API route forwards that JSON to
the webhook URL and returns success or failure JSON to the frontend.

If `DATE_PLAN_WEBHOOK_URL` is not configured:

- The API route does not crash.
- In development, it logs the submitted plan to the server console.
- It returns success with `configured: false`.
- The confirmation screen tells the visitor to screenshot the plan and send it.

## Deploy to Vercel

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Add `DATE_PLAN_WEBHOOK_URL` in Vercel project settings if submissions should
   be forwarded somewhere.
5. Deploy.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
