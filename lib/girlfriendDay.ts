export const PASSCODE = "0722";

export const PUZZLE_IMAGE_SRC = "/assets/puzzle-photo.jpg";

export const LOVE_SCRIPT_LINES = ["my love,", "eternal for you"];
export const LOVE_SCRIPT_TEXT = LOVE_SCRIPT_LINES.join(" ");

export type PlaylistSong = {
  audioSrc: string;
  title: string;
  artist: string;
  coverSrc: string;
};

export type MemoryPhoto = {
  alt: string;
  caption: string;
  src: string;
};

export const MEMORY_PHOTOS: MemoryPhoto[] = [
  {
    alt: "Dachi and Ninuca together",
    caption: "aura",
    src: "/assets/medaninuca.jpg",
  },
  {
    alt: "Dachi and Ninuca memory",
    caption: "monishnuli :*",
    src: "/assets/medaninuci.jpg",
  },
  {
    alt: "Dachi and Ninuca memory sequence one",
    caption: "nacili 1",
    src: "/assets/chven.jpg",
  },
  {
    alt: "Dachi and Ninuca memory sequence two",
    caption: "nacili 2",
    src: "/assets/chven2.jpg",
  },
  {
    alt: "Dachi and Ninuca memory sequence three",
    caption: "nacili 3",
    src: "/assets/chven3.jpg",
  },
];

export const PLAYLIST_SONGS: PlaylistSong[] = [
  {
    audioSrc: "/audio/shes-my-collar.mp3",
    title: "She's My Collar (feat. Kali Uchis)",
    artist: "Gorillaz, Kali Uchis",
    coverSrc: "/assets/music-covers/shes-my-collar.webp",
  },
  {
    audioSrc: "/audio/lovers-rock.mp3",
    title: "Lovers Rock",
    artist: "TV Girl",
    coverSrc: "/assets/music-covers/lovers-rock.png",
  },
  {
    audioSrc: "/audio/shes-my-witch.mp3",
    title: "She's my Witch",
    artist: "Kip Tyler",
    coverSrc: "/assets/music-covers/shes-my-witch.png",
  },
  {
    audioSrc: "/audio/always-forever.mp3",
    title: "Always Forever",
    artist: "Cults",
    coverSrc: "/assets/music-covers/always-forever.png",
  },
];
