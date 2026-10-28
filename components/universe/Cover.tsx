"use client";

import { useRef } from "react";
import { Arrow, Photo, Star, UniverseStamp } from "./Artwork";

export function Cover({ onEnter }: { onEnter: () => void }) {
  const artwork = useRef<HTMLDivElement>(null);
  return (
    <section
      className="entrance chapter-scene"
      aria-labelledby="entrance-title"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !artwork.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        artwork.current.style.setProperty(
          "--pointer-x",
          `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`,
        );
        artwork.current.style.setProperty(
          "--pointer-y",
          `${((event.clientY - rect.top) / rect.height - 0.5) * 14}px`,
        );
      }}
      onPointerLeave={() => {
        artwork.current?.style.setProperty("--pointer-x", "0px");
        artwork.current?.style.setProperty("--pointer-y", "0px");
      }}
    >
      <div className="entrance-copy">
        <p className="eyebrow">
          <span className="little-line" /> A COORDINATE CALLED US
        </p>
        <h1 id="entrance-title" tabIndex={-1}>
          Somewhere,
          <br />
          <em>only us.</em>
          <Star className="title-star" />
        </h1>
        <p className="entrance-subtitle">
          პატარა სამყარო
          <br />
          ჩვენი პატარ-პატარა მოგონებებით
        </p>
        <button className="enter-button" onClick={onEnter}>
          <span>STEP INSIDE</span>
          <span className="enter-arrow">
            <Arrow direction="up" />
          </span>
        </button>
        <div className="entrance-dedication">
          <span className="dedication-line" />
          <span>FOR NINUTSI. FROM DACHI.</span>
        </div>
      </div>
      <div className="entrance-art" ref={artwork}>
        <div className="portal-halo" />
        <svg
          className="portal-orbits"
          viewBox="0 0 700 660"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="350"
            cy="330"
            rx="320"
            ry="184"
            transform="rotate(-31 350 330)"
          />
          <ellipse
            cx="350"
            cy="330"
            rx="295"
            ry="230"
            transform="rotate(32 350 330)"
          />
          <path
            d="M15 330h670M350 30v600"
            strokeDasharray="2 9"
            opacity=".35"
          />
          <circle cx="86" cy="404" r="5" className="orbit-dot" />
          <circle cx="601" cy="178" r="3" className="orbit-dot" />
          <path d="m569 473 17 17m-17 0 17-17M174 123h13m-6.5-6.5v13" />
        </svg>
        <div className="portal-photo portal-photo--back">
          <div className="paper-image">
            <Photo
              id="sofa"
              alt="A kiss on the cheek on the sofa"
              priority
              sizes="(max-width: 700px) 27vw, 15vw"
            />
          </div>
          <span>THE GOOD STUFF.</span>
        </div>
        <button
          className="portal-photo portal-photo--main portal-door"
          onClick={onEnter}
          aria-label="Enter the memory sky"
        >
          <div className="paper-image">
            <Photo
              id="flowers"
              alt="Dachi and Ninutsi together with purple flowers"
              position="50% 40%"
              priority
              sizes="(max-width: 700px) 48vw, 27vw"
            />
          </div>
          <span>
            <Star /> OUR OWN KIND OF GRAVITY <span>01</span>
          </span>
        </button>
        <div className="portal-photo portal-photo--small">
          <div className="paper-image">
            <Photo
              id="hands"
              alt="Our hands and matching bracelets"
              sizes="(max-width: 700px) 25vw, 13vw"
            />
          </div>
          <span>YOU + ME</span>
        </div>
        <div className="portal-moon">
          <Photo
            id="mushrooms"
            alt="A pair of tiny handmade clay mushrooms"
            sizes="100px"
          />
        </div>
        <div className="orbit-annotation">
          TWO PEOPLE.
          <br />
          ONE LITTLE UNIVERSE.
          <span>
            <Arrow />
          </span>
        </div>
        <Star className="portal-star portal-star--one" />
        <Star className="portal-star portal-star--two" hollow />
        <Star className="portal-star portal-star--three" />
        <UniverseStamp className="portal-stamp" />
        <span className="portal-coordinate">∞° N &nbsp; / &nbsp; ∞° D</span>
      </div>
      <div className="entrance-bottom">
        <span>NOT FAR AWAY. JUST A LITTLE CLOSER.</span>
        <span className="entrance-bottom-right">
          <span className="live-dot" /> MADE OF REAL MOMENTS
        </span>
      </div>
    </section>
  );
}
