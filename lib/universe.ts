export type Photograph = {
  id: string;
  title: string;
  alt: string;
  position?: string;
};

export const memories: readonly Photograph[] = [
  {
    id: "flowers",
    title: "Exactly where I want to be.",
    alt: "Dachi and Ninutsi together with a bouquet of purple flowers",
    position: "50% 42%",
  },
  {
    id: "hands",
    title: "Cota emoebi",
    alt: "Our hands together, wearing matching bracelets",
  },
  {
    id: "sofa",
    title: "Chemi sikvaruli",
    alt: "A kiss on the cheek while we sit together on a sofa",
  },
  {
    id: "garden",
    title: "A little bit of sunshine.",
    alt: "A kiss on the cheek in the garden",
    position: "50% 38%",
  },
  {
    id: "cheek",
    title: "ჩვენ და ხარისხიანი კამერები",
    alt: "Ninutsi smiling as Dachi kisses her cheek",
  },
  {
    id: "embrace",
    title: "No place else.",
    alt: "The two of us curled up in an embrace",
  },
  {
    id: "sunshine",
    title: "Just one more taste",
    alt: "A close-up kiss in the sunshine",
  },
  {
    id: "feet",
    title: "Even the smallest things.",
    alt: "Our sock-covered feet touching",
  },
  { id: "night", title: "The rest can wait.", alt: "A kiss together at night" },
  { id: "hug", title: "My favourite place.", alt: "Holding each other close" },
  {
    id: "laugh",
    title: "და ისევ friendzone :P",
    alt: "A playful photo of the two of us together",
  },
  {
    id: "kiss",
    title: "All over again.",
    alt: "A kiss on the cheek with a bouquet of flowers",
    position: "50% 38%",
  },
];

export const keepsakes: readonly (Photograph & {
  label: string;
  kind: string;
})[] = [
  {
    id: "mushrooms",
    title: "A tiny forest for two.",
    alt: "Our handmade red and blue clay mushrooms",
    label: "A tiny forest",
    kind: "mushroom",
  },
  {
    id: "creatures",
    title: "Two of a kind.",
    alt: "Our handmade purple and blue clay creatures",
    label: "Two odd souls",
    kind: "creature",
  },
  {
    id: "players",
    title: "Always my player two.",
    alt: "A handmade yellow Pac-Man and pink ghost resting in a hand",
    label: "Player two",
    kind: "player",
  },
  {
    id: "bees",
    title: "Made for each other.",
    alt: "Our two little handmade clay bees",
    label: "The busy ones",
    kind: "bee",
  },
];

export const chapters = [
  { id: "entrance", label: "The invitation" },
  { id: "orbit", label: "Our orbit" },
  { id: "darkroom", label: "A little light" },
  { id: "things", label: "The little things" },
  { id: "reunion", label: "A little closer" },
] as const;

export type Chapter = (typeof chapters)[number]["id"];
export type PhotoSelection = {
  collection: readonly Photograph[];
  index: number;
};
