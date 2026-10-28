import { Star } from "./Artwork";

export function Transit() {
  return (
    <div className="transit" aria-hidden="true">
      <div className="transit-iris" />
      <div className="transit-centre">
        <Star />
        <span>A LITTLE CLOSER</span>
      </div>
      <div className="transit-rays">
        {Array.from({ length: 16 }, (_, index) => (
          <i key={index} style={{ transform: `rotate(${index * 22.5}deg)` }} />
        ))}
      </div>
    </div>
  );
}
