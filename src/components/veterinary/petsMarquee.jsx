import MarqueeEffect from "react-fast-marquee";

const images = Object.values(
  import.meta.glob("@/assets/images/veterinary/pet-*.jpg", { eager: true })
).map((mod) => mod.default);

const PetsMarquee = () => (
  <section className="petsMarquee">
      <MarqueeEffect className="marquee d-flex flex-start">
        {images.map((image, i) => (
          <span className="marqueeItem me-4" key={i}>
            <img
              src={image}
              className="marqueeImg rounded-circle"
              alt={`pet-${i + 1}`}
            />
          </span>
        ))}
      </MarqueeEffect>
  </section>
);

export default PetsMarquee;
