import { FINAL_LETTER } from "@/lib/surpriseContent";

const paragraphs = FINAL_LETTER.body.trim().split(/\n\s*\n/);

export function FinalLetter() {
  return (
    <section className="letter-section" id="love-letter" aria-labelledby="letter-title">
      <div className="letter-glow" aria-hidden="true" />
      <div className="letter-ribbon letter-ribbon-left" aria-hidden="true" />
      <div className="letter-ribbon letter-ribbon-right" aria-hidden="true" />

      <article className="letter-paper">
        <span className="paper-corner paper-corner-top" aria-hidden="true">
          ❦
        </span>
        <span className="paper-corner paper-corner-bottom" aria-hidden="true">
          ❦
        </span>
        <header className="letter-heading">
          <p className="eyebrow">{FINAL_LETTER.eyebrow}</p>
          <h2 id="letter-title">{FINAL_LETTER.title}</h2>
          <span aria-hidden="true">✦ &nbsp; ♡ &nbsp; ✦</span>
        </header>

        <div className="letter-body" lang="ka">
          <p className="letter-salutation">{FINAL_LETTER.salutation}</p>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="letter-signoff">
            {FINAL_LETTER.signOff ? <p>{FINAL_LETTER.signOff}</p> : null}
            <strong>{FINAL_LETTER.signature}</strong>
          </div>
        </div>

        <div className="letter-seal" aria-hidden="true">
          ♡
        </div>
      </article>

      <footer className="closing-note">
        <span aria-hidden="true">✦</span>
        მხოლოდ შენთვის ♡
        <span aria-hidden="true">✦</span>
      </footer>
    </section>
  );
}
