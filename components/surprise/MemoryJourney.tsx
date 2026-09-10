import { PhotoFrame } from "@/components/surprise/PhotoFrame";
import {
  MEMORY_SEQUENCE,
  PAGE_COPY,
  getPhoto,
} from "@/lib/surpriseContent";

export function MemoryJourney() {
  return (
    <section className="memory-journey" id="memories" aria-labelledby="memory-title">
      <div className="memory-leaf memory-leaf-left" aria-hidden="true">
        ❦
      </div>
      <div className="memory-leaf memory-leaf-right" aria-hidden="true">
        ❦
      </div>

      <header className="section-intro section-intro-paper">
        <p className="eyebrow">{PAGE_COPY.memoryEyebrow}</p>
        <h2 id="memory-title">{PAGE_COPY.memoryTitle}</h2>
        <p>{PAGE_COPY.memoryBody}</p>
      </header>

      <div className="memory-path">
        <span className="memory-thread" aria-hidden="true" />
        {MEMORY_SEQUENCE.map((photoId, index) => {
          const photo = getPhoto(photoId);

          return (
            <article
              className={`memory-card memory-card-${index + 1}`}
              key={photo.id}
            >
              <span className="memory-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <PhotoFrame
                className="memory-photo"
                photo={photo}
                sizes="(min-width: 900px) 31rem, (min-width: 600px) 68vw, 88vw"
              />
              <div className="memory-caption">
                <p>{photo.chapter}</p>
                <h3>{photo.caption}</h3>
                <span aria-hidden="true">♡</span>
              </div>
            </article>
          );
        })}
      </div>

      <blockquote className="memory-interlude">
        <span aria-hidden="true">“</span>
        <p>{PAGE_COPY.interlude}</p>
        <span aria-hidden="true">”</span>
      </blockquote>
    </section>
  );
}
