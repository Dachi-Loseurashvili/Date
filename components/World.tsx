"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Scene = "cover" | "cabinet" | "gallery" | "ending";

const objects = [
  { image: "mushrooms", number: "01", name: "little worlds", detail: "The things we make." },
  { image: "creatures", number: "02", name: "little creatures", detail: "The things we keep." },
  { image: "pacman", number: "03", name: "little games", detail: "The things that make us laugh." },
  { image: "bees", number: "04", name: "little companions", detail: "The things that remind me of you." },
] as const;

const photos = [
  { image: "hands", alt: "Our hands together with matching bracelets", position: "center" },
  { image: "embrace", alt: "A quiet embrace together", position: "center" },
  { image: "kiss", alt: "A kiss with flowers", position: "center" },
  { image: "portrait", alt: "The two of us sitting together", position: "center" },
  { image: "garden", alt: "A kiss outside", position: "center" },
  { image: "feet", alt: "Our feet touching", position: "center" },
  { image: "together", alt: "A close moment together", position: "center" },
  { image: "hug", alt: "An embrace", position: "center" },
] as const;

function Photo({ name, alt, priority = false, className = "", position = "center" }: { name: string; alt: string; priority?: boolean; className?: string; position?: string }) {
  return <Image src={`/assets/world/${name}.jpg`} alt={alt} fill unoptimized priority={priority} sizes="(max-width: 700px) 85vw, 45vw" className={className} style={{ objectPosition: position }} />;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

export function World() {
  const [scene, setScene] = useState<Scene>("cover");
  const [selectedObject, setSelectedObject] = useState<number | null>(null);
  const [photo, setPhoto] = useState(0);
  const [opened, setOpened] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const objectTrigger = useRef<HTMLButtonElement | null>(null);

  const go = (next: Scene) => {
    setScene(next);
    setSelectedObject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showObject = (index: number, trigger: HTMLButtonElement) => {
    objectTrigger.current = trigger;
    setSelectedObject(index);
    setOpened((current) => current.includes(index) ? current : [...current, index]);
  };
  const movePhoto = (direction: number) => setPhoto((current) => (current + direction + photos.length) % photos.length);

  useEffect(() => {
    if (selectedObject !== null) {
      closeButton.current?.focus();
      return () => objectTrigger.current?.focus();
    }
  }, [selectedObject]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedObject(null);
      if (scene === "gallery" && event.key === "ArrowRight") movePhoto(1);
      if (scene === "gallery" && event.key === "ArrowLeft") movePhoto(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene]);

  const sceneNumber = scene === "cover" ? "00" : scene === "cabinet" ? "01" : scene === "gallery" ? "02" : "03";

  return (
    <main className={`world world--${scene}`}>
      <header className="topbar">
        <button className="wordmark" onClick={() => go("cover")} aria-label="Back to the beginning">N <span>✳</span> D</button>
        <div className="topbar-center">A SMALL WORLD, MADE OF US</div>
        <div className="topbar-right"><span className="status-dot" /> {sceneNumber} / 03</div>
      </header>

      {scene === "cover" && (
        <section className="cover scene" aria-labelledby="cover-title">
          <div className="cover-grain" />
          <div className="cover-copy">
            <p className="eyebrow"><span className="tiny-star">✳</span> A LITTLE SOMETHING FOR YOU</p>
            <h1 id="cover-title">A world<br /><em>of our own.</em></h1>
            <p className="cover-sub">A collection of little things<br />that feel a lot like us.</p>
            <button className="round-link cover-link" onClick={() => go("cabinet")}><span>ENTER OUR WORLD</span><span className="circle-arrow"><Arrow diagonal /></span></button>
          </div>
          <div className="cover-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="cover-photo"><Photo name="cover" alt="" priority /></div>
            <div className="cover-stamp"><span>MADE OF</span><strong>us</strong><span>✳ &nbsp; ✳ &nbsp; ✳</span></div>
            <span className="spark spark-one">✳</span><span className="spark spark-two">✦</span>
            <span className="cover-side-note">A PLACE FOR OUR LITTLE UNIVERSE &nbsp; / &nbsp; FOREVER IN PROGRESS</span>
          </div>
          <div className="cover-bottom"><span>AN INTERACTIVE KEEPSAKE</span><span>SCROLL LESS, FEEL MORE &nbsp; ✳</span></div>
        </section>
      )}

      {scene === "cabinet" && (
        <section className="cabinet scene" aria-labelledby="cabinet-title">
          <div className="section-intro">
            <div><p className="eyebrow"><span className="tiny-star">✳</span> THE LITTLE THINGS &nbsp; / &nbsp; 01</p><h1 id="cabinet-title">Our curious<br /><em>little collection.</em></h1></div>
            <p className="intro-aside">Some things are too lovely<br />to leave in the ordinary. <span>✳</span></p>
          </div>
          <div className="cabinet-rule"><span>THE CABINET OF US</span><span>TOUCH EACH LITTLE THING</span><span>{String(opened.length).padStart(2, "0")} / 04 FOUND</span></div>
          <div className="object-grid">
            {objects.map((object, index) => (
              <button className={`object-card object-card--${index + 1}`} key={object.image} onClick={(event) => showObject(index, event.currentTarget)} aria-label={`Open ${object.name}`}>
                <span className="object-number">NO. {object.number} {opened.includes(index) && <span>✳</span>}</span>
                <span className="object-image"><Photo name={object.image} alt="" /></span>
                <span className="object-label"><em>{object.name}</em><span>↗</span></span>
              </button>
            ))}
          </div>
          <div className="section-footer"><span>A COLLECTION WITH NO END <span className="footer-star">✳</span></span><button className="text-link" onClick={() => go("gallery")}>NEXT: THE MOMENTS <Arrow /></button></div>
          {selectedObject !== null && (
            <div className="object-overlay" onClick={() => setSelectedObject(null)}>
              <div className="object-note" role="dialog" aria-modal="true" aria-label={objects[selectedObject].name} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Tab") { event.preventDefault(); closeButton.current?.focus(); } }}>
                <button ref={closeButton} className="close-button" onClick={() => setSelectedObject(null)} aria-label="Close">×</button>
                <div className="note-image"><Photo name={objects[selectedObject].image} alt={objects[selectedObject].name} /></div>
                <div className="note-copy"><p className="eyebrow">A LITTLE THING &nbsp; / &nbsp; {objects[selectedObject].number}</p><h2>{objects[selectedObject].name}<em>.</em></h2><p>{objects[selectedObject].detail}</p><span className="note-star">✳</span></div>
              </div>
            </div>
          )}
        </section>
      )}

      {scene === "gallery" && (
        <section className="gallery scene" aria-labelledby="gallery-title">
          <div className="gallery-heading"><div><p className="eyebrow"><span className="tiny-star">✳</span> THE MOMENTS &nbsp; / &nbsp; 02</p><h1 id="gallery-title">Look at <em>us.</em></h1></div><p>All the little moments.<br />All my favorite ones.</p></div>
          <div className="gallery-stage">
            <div className="gallery-side gallery-side--left"><span>THE WAY WE WERE</span><span className="gallery-big-star">✳</span><span>AND THE WAY WE ARE</span></div>
            <div className="gallery-image-wrap"><div className="gallery-image" key={photos[photo].image}><Photo name={photos[photo].image} alt={photos[photo].alt} position={photos[photo].position} /></div><span className="image-index">{String(photo + 1).padStart(2, "0")} <i>/</i> {String(photos.length).padStart(2, "0")}</span></div>
            <div className="gallery-side gallery-side--right"><span>COLLECTED MOMENTS</span><span className="handwritten">you<br />& me</span><span>KEEP THESE CLOSE</span></div>
          </div>
          <div className="gallery-controls"><button onClick={() => movePhoto(-1)} aria-label="Previous photo">←</button><div className="photo-dots" aria-label="Choose a photo">{photos.map((item, index) => <button key={item.image} className={index === photo ? "active" : ""} onClick={() => setPhoto(index)} aria-label={`Photo ${index + 1} of ${photos.length}`} aria-pressed={index === photo} />)}</div><button onClick={() => movePhoto(1)} aria-label="Next photo">→</button></div>
          <div className="section-footer"><button className="back-link" onClick={() => go("cabinet")}>← &nbsp; THE LITTLE THINGS</button><button className="text-link" onClick={() => go("ending")}>ONE LAST THING <Arrow /></button></div>
        </section>
      )}

      {scene === "ending" && (
        <section className={`ending scene ${revealed ? "is-revealed" : ""}`} aria-labelledby="ending-title">
          <div className="ending-top"><p className="eyebrow"><span className="tiny-star">✳</span> ONE LAST THING &nbsp; / &nbsp; 03</p><span>FOR YOU, ALWAYS</span></div>
          <div className="ending-composition">
            <div className="ending-photo ending-photo--one"><Photo name="kiss" alt="A kiss with flowers" /></div>
            <div className="ending-photo ending-photo--two"><Photo name="hands" alt="Our hands together" /></div>
            <div className="ending-photo ending-photo--three"><Photo name="embrace" alt="An embrace together" /></div>
            <div className="ending-message"><span className="ending-spark">✳</span><p>IN EVERY LITTLE UNIVERSE,</p><h1 id="ending-title">it&apos;s <em>you.</em></h1><p>AND IT WILL ALWAYS BE YOU.</p><button className="reveal-button" onClick={() => setRevealed(!revealed)} aria-expanded={revealed}>{revealed ? "♡" : "OPEN A LITTLE NOTE"} <span>{revealed ? "" : "↗"}</span></button><div className="secret-note" aria-live="polite">{revealed && <>მიყვარხარ, ნინუცი <span>♡</span><small>— დაჩი</small></>}</div></div>
          </div>
          <div className="section-footer ending-footer"><button className="back-link" onClick={() => go("gallery")}>← &nbsp; THE MOMENTS</button><button className="text-link" onClick={() => { setRevealed(false); go("cover"); }}>BACK TO THE BEGINNING <Arrow /></button></div>
        </section>
      )}
    </main>
  );
}
