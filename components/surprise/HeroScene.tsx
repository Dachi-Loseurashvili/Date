import { FloatingDecor } from "@/components/surprise/FloatingDecor";
import { PhotoFrame } from "@/components/surprise/PhotoFrame";
import { PAGE_COPY, getPhoto } from "@/lib/surpriseContent";

const heroPhoto = getPhoto("hero");

export function HeroScene() {
  return (
    <section className="hero-scene" aria-labelledby="hero-title">
      <FloatingDecor />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">{PAGE_COPY.heroEyebrow}</p>
          <h1 id="hero-title">{PAGE_COPY.heroTitle}</h1>
          <p className="hero-description">{PAGE_COPY.heroBody}</p>
          <JourneyLink className="hero-cta-desktop" />
        </div>

        <figure className="hero-portrait">
          <div className="portrait-moon" aria-hidden="true" />
          <span className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
          <span className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
          <span className="portrait-spark portrait-spark-one" aria-hidden="true">
            ✦
          </span>
          <span className="portrait-spark portrait-spark-two" aria-hidden="true">
            ✦
          </span>
          <PhotoFrame
            className="hero-photo"
            photo={heroPhoto}
            priority
            sizes="(min-width: 900px) 38rem, 82vw"
          />
          <figcaption>
            <span aria-hidden="true">✦</span>
            {heroPhoto.caption}
          </figcaption>
        </figure>

        <JourneyLink className="hero-cta-mobile" />
      </div>

      <div className="hero-curtain" aria-hidden="true" />
    </section>
  );
}

type JourneyLinkProps = {
  className: string;
};

function JourneyLink({ className }: JourneyLinkProps) {
  return (
    <a className={`primary-link ${className}`} href="#memories">
      <span>{PAGE_COPY.heroCta}</span>
      <span aria-hidden="true">↓</span>
    </a>
  );
}
