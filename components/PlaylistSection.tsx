import Image from "next/image";
import { MusicCard } from "@/components/MusicCard";
import {
  MEMORY_PHOTOS,
  PLAYLIST_SONGS,
  type MemoryPhoto,
} from "@/lib/girlfriendDay";

type MemoryFrameProps = {
  className: string;
  photo: MemoryPhoto;
};

function MemoryFrame({ className, photo }: MemoryFrameProps) {
  return (
    <figure className={`memory-frame ${className}`}>
      <Image
        alt={photo.alt}
        className="memory-photo"
        height={720}
        sizes="(min-width: 760px) 38vw, 100vw"
        src={photo.src}
        width={720}
      />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

function getMemoryPhoto(index: number) {
  const photo = MEMORY_PHOTOS[index];

  if (!photo) {
    throw new Error(`Missing memory photo at index ${index}`);
  }

  return photo;
}

function getPlaylistSong(index: number) {
  const song = PLAYLIST_SONGS[index];

  if (!song) {
    throw new Error(`Missing playlist song at index ${index}`);
  }

  return song;
}

export function PlaylistSection() {
  return (
    <section className="memories-playlist-section" aria-labelledby="playlist-title">
      <div className="section-heading">
        <h2 id="playlist-title">chveni playlistidan ♡</h2>
      </div>

      <div className="memory-mosaic">
        <MemoryFrame className="memory-frame-large" photo={getMemoryPhoto(0)} />
        <div className="mosaic-song-card mosaic-song-one">
          <MusicCard number={1} song={getPlaylistSong(0)} />
        </div>

        <MemoryFrame className="memory-frame-small" photo={getMemoryPhoto(1)} />

        <div className="mosaic-song-card mosaic-song-two">
          <MusicCard number={2} song={getPlaylistSong(1)} />
        </div>

        <MemoryFrame
          className="memory-frame-story memory-frame-story-one"
          photo={getMemoryPhoto(2)}
        />
        <div className="mosaic-song-card mosaic-song-three">
          <MusicCard number={3} song={getPlaylistSong(2)} />
        </div>
        <MemoryFrame
          className="memory-frame-story memory-frame-story-two"
          photo={getMemoryPhoto(3)}
        />
        <div className="mosaic-song-card mosaic-song-four">
          <MusicCard number={4} song={getPlaylistSong(3)} />
        </div>
        <MemoryFrame
          className="memory-frame-story memory-frame-story-three"
          photo={getMemoryPhoto(4)}
        />
      </div>
    </section>
  );
}
