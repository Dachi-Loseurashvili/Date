export type PhotoAsset = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  chapter: string;
  rotation: number;
};

export const PHOTO_MANIFEST = [
  {
    id: "hero",
    src: "/assets/memories/smile.jpg",
    width: 840,
    height: 1280,
    alt: "მე და ნინუცი ყვავილების თაიგულით",
    caption: "მე და ჩემი ყველაზე ლამაზი გოგო ♡",
    chapter: "ჩვენი საღამო",
    rotation: 0,
  },
  {
    id: "hands",
    src: "/assets/memories/hands.jpg",
    width: 936,
    height: 1050,
    alt: "ჩვენი ხელები და ერთნაირი სამაჯურები",
    caption: "ძალიან ემოები",
    chapter: "ერთად",
    rotation: -2.2,
  },
  {
    id: "bouquet-kiss",
    src: "/assets/memories/bouquet-kiss.jpg",
    width: 965,
    height: 1280,
    alt: "მე და ნინუცი ყვავილების თაიგულთან",
    caption: "ყვავილებიც და ჩემი ქალბატონიც ულამაზესი ♡",
    chapter: "ნინუცი, დაჩი და იასამნისფერი ყვავილები",
    rotation: 1.8,
  },
  {
    id: "garden-kiss",
    src: "/assets/memories/garden-kiss.jpg",
    width: 852,
    height: 1280,
    alt: "ჩვენი კოცნა ბაღში",
    caption: "She's like the greatest person in the world, like an angel",
    chapter: "კიკვიძე და ჩვენ",
    rotation: -1.4,
  },
  {
    id: "film-one",
    src: "/assets/memories/film-one.jpg",
    width: 1079,
    height: 1124,
    alt: "ჩვენი ერთად გადაღებული ფოტო",
    caption: "ჩვენ და ჩვენი ხარისხიანი ფოტოები :(",
    chapter: ":*",
    rotation: 2.4,
  },
  {
    id: "film-two",
    src: "/assets/memories/film-two.jpg",
    width: 1080,
    height: 1132,
    alt: "ჩვენი მხიარული ფოტო ახლო ხედით",
    caption: "Exactly where I wanna be",
    chapter: "(აიფონის უხარისხო კამერა)",
    rotation: -2.8,
  },
  {
    id: "film-three",
    src: "/assets/memories/film-three.jpg",
    width: 1079,
    height: 1097,
    alt: "ჩვენი კოცნა ღამით",
    caption: "არ მყოფნის შენი და ჩვენი მოგონებების ყურება",
    chapter: "მიყვარს შენი კოცნა და",
    rotation: 1.5,
  },
  {
    id: "sunlit-kiss",
    src: "/assets/memories/sunlit-kiss.jpg",
    width: 608,
    height: 622,
    alt: "ჩვენი კოცნა დღის შუქზე",
    caption: "მინდა მთელი ცხოვრება შენი პომადები მატყო ლოყებზე და ტუჩებზე",
    chapter: "ბედნიერი დანი",
    rotation: -1.2,
  },
] as const satisfies readonly PhotoAsset[];

export type PhotoId = (typeof PHOTO_MANIFEST)[number]["id"];

export const MEMORY_SEQUENCE: readonly PhotoId[] = [
  "hands",
  "bouquet-kiss",
  "garden-kiss",
  "film-one",
  "film-two",
  "film-three",
  "sunlit-kiss",
];

export const PAGE_COPY = {
  heroEyebrow: "ჩვენი კრეატიული რომანტიკა :*",
  heroTitle: "ჩემი ყველაზე კარგი გოგოსთვის",
  heroBody:
    "ჩვენს არც თუ ისე ბევრ (ჯერჯერობით), მაგრამ საყვარელ ფოტოებს და მოგონებებს მოვუყარე თავი ერთად, ფოტოებს და მოგონებებს რომლებიც მაბედნიერებს",
  heroCta: "გავიხსენოთ ბაე",
  memoryEyebrow: "ჩვენი ბუნდოვანი ფოტოები",
  memoryTitle: "ფოტოები, რომლებსაც ყოველ დღე ვუყურებ ხოლმე",
  memoryBody:
    "ზოგი კარგია, უმეტესობა ბუნდოვანი, მაგრამ ყველა მიყვარს იმიტომ რომ ჩემს პრინცესასთან ვარ",
  interlude:
    "ამ ფოტოების ყურებისას ახლიდან ვხვდები ხოლმე რამდენად ბედნიერი ვარ რომ მყავხარ.",
  keepsakeEyebrow: "და...",
  keepsakeTitle: "სამი რაღაც რაც განსაკუთრებულად მიყვარს ;)",
  keepsakeBody:
    "სამივეს დააჭირე ჩემო პრინცესა, ბოლოს შენთვის კიდევ ერთი რაღაც მაქვს",
  letterLocked: "ჯერ სამივე გახსენი ♡",
  letterReady: "ახლა უკვე წერილიც შეგიძლია გახსნა ♡",
  letterButton: "გახსენი წერილი",
} as const;

export const KEEPSAKES = [
  {
    id: "light",
    symbol: "✦",
    label: "შენი ულამაზესი ღიმილი",
    hint: "დააჭირე და ნახე",
    note: "შენი ღიმილის დანახვა გულს მიხარებს და გულწრფელად მაბედნიერებს",
  },
  {
    id: "home",
    symbol: "♡",
    label: "შენთან ყოფნა",
    hint: "დააჭირე და ნახე",
    note: "შენთან ყოფნისას ყველა წუთი სასიამოვნოდ გადის, ძალიან სწრაფად და სასიამოვნოდ",
  },
  {
    id: "wish",
    symbol: "✿",
    label: "ჩვენი მომავალი",
    hint: "დააჭირე და ნახე",
    note: "მსიამოვნებს ფიქრი მომავალზე რომელიც შენს გარეშე არ წარმომიდგენია",
  },
] as const;

export const KEEPSAKES_REQUIRED_TO_UNLOCK = KEEPSAKES.length;

// The complete letter lives here so its wording stays easy to edit.
export const FINAL_LETTER = {
  eyebrow: "დააა ბოლოს...",
  title: "წერილი ქალბატონ ნინუცის",
  salutation: "და ისევ, ჩემს სიყვარულს",
  body: `დავიწყებ იმით რომ მიყვარხარ. იმაზე მეტად ვიდრე გუშინ, იმიტომ რომ თითქოს უწყვეტად იზრდება შენს მიმართ ჩემი გრძნობები. ვერასდროს წარმოვიდგენდი, რომ შეიძლებოდა ის სიყვარული, რომელზეც ყველა ლაპარაკობდა და ასე გაზვიადებულად აღწერდა მართლა რაღაც ასეთი სასწაული გრძნობა ყოფილიყო, მაგრამ რაც გაგონილი მქონდა, შენმა სიყვარულმა ყველაფერს გადააჭარბა,
  ყველაფერი დაჩრდილა და სიტყვებით აღუწერელი გრძნობა აღმოჩნდა. ბევრჯერ მითქვამს, მაგრამ კიდევ გეტყვი, რომ გაღვიძებისას ჩემი პირველი ფიქრი ხარ, დაძინებისას ბოლო, მომავალზე ფიქრისას შენს გარეშე უბრალოდ ვერაფერი წარმომიდგენია და არც მინდა წარმოდგენა.
  ახლა როცა ვნახე და ვიგრძენი როგორია შენი სიყვარული, უბრალოდ არ მინდა წარმოვიდგინო ცხოვრება ამ გრძნობის გარეშე. ჩემი ადამიანი ხარ, ჩემი მეორე ნახევარი, არაფერში ვყოფილვარ ისეთი დარწმუნებული როგორც ამ სიტყვებში. ჩემი თვალებით რომ შეგეძლოს საკუთარი თავის დანახვა
  ეჭვიც კი არ შეგეპარებოდა წამითაც კი, რომ არავინაა შენზე უკეთესი, ვიცი რომ სიტყვები ზოგჯერ არაა საკმარისი, ვიცი რომ რთულია ნდობა, მაგრამ აუცილებლად დაგარწმუნებ ყველა სიტყვაში, რომელსაც ახლა გეუბნები და სანამ დაგარწმუნებ, უბრალოდ მინდა გახსოვდეს, ყველა სიტუაციაში, ყოველთვის, მიყვარხარ.`,
  signOff: "",
  signature: "დაჩისგან",
} as const;

export function getPhoto(id: PhotoId): PhotoAsset {
  const photo = PHOTO_MANIFEST.find((item) => item.id === id);

  if (!photo) {
    throw new Error(`Unknown photo id: ${id}`);
  }

  return photo;
}
