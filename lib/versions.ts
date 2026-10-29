export const pastVersions = [
  {
    slug: "flowers",
    title: "Flowers",
    date: "14 Jun 2026",
    commit: "9f5a161e580aebf483009a800e5921eb2f474539",
    commitTitle: "flowers",
    pageTitle: "Ninuca da Dachi",
    description: "The original invitation, flowers, and a little music.",
    lang: "en",
    themeColor: "#f5f3ff",
  },
  {
    slug: "girlfriends-day",
    title: "Girlfriend’s day",
    date: "1 Aug 2026",
    commit: "ac1af7a4cad362bd47a10180d6c985646fff22c9",
    commitTitle: "girlfriend's day",
    pageTitle: "National Girlfriend's Day",
    description: "A little password, a picture puzzle, and our songs.",
    lang: "en",
    themeColor: "#f5f3ff",
  },
  {
    slug: "our-little-story",
    title: "Our little story",
    date: "10 Sep 2026",
    commit: "82a91ab6b09078ec638840dd833086b7e84fa048",
    commitTitle: "grammar mistake fix",
    pageTitle: "ჩვენი პატარა ამბავი",
    description: "ჩვენი ფოტოები, მოგონებები და ერთი წერილი ნინუცისთვის.",
    lang: "ka",
    themeColor: "#170d2c",
  },
] as const;

export type PastVersion = (typeof pastVersions)[number];
export type VersionSlug = PastVersion["slug"];

export function versionHref(version: PastVersion): string {
  return `/versions/${version.slug}`;
}
