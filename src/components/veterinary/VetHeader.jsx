import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import backgroundImage from "@/assets/images/veterinary/8.jpg";
import banner01 from "@/assets/images/veterinary/banner01.png";
import banner02 from "@/assets/images/veterinary/banner02.png";
import banner03 from "@/assets/images/veterinary/banner03.png";
import bubble from "@/assets/images/veterinary/bubble.png"

const heading = [
  { image: banner01, text1: "健康依靠", text2: "給毛孩最好的", text3: "專業關懷，您最信賴的選擇" },
  { image: banner02, text1: "安心陪伴", text2: "毛孩的避風港", text3: "貼心呵護，守住每個重要時刻" },
  { image: banner03, text1: "專業醫療", text2: "守護毛孩健康", text3: "技術領先，保障全方位健康" },
];

const SlideText = ({ text, index }) => (
  <h3 className="Kosugi-Maru fz-48 lh-12 text-fade-in" key={`vet-head-text-${index}`}>
    {text}
  </h3>
);

const VetHeader = ({ clinicData }) => {
  const [index, setIndex] = useState(0);
  const currentSlide = useMemo(() => heading[index], [index]);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % heading.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="veterinaryHeader position-relative"
      style={{ backgroundImage: `url(${clinicData?.imageUrl || backgroundImage})`, opacity: 0.8 }}
    >
      <div className="container">
        <div className="bubble position-absolute bottom-138">
          <img src={bubble} className="bubbleJpg" alt="bubble" />
          <div className="bannerJpg">
            <motion.img
              key={index}
              src={currentSlide.image}
              alt={`Slide ${index + 1}`}
              className="image"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="vetBannerTitle d-flex flex-column z-3">
            <h5 className="Kosugi-Maru fz-24 lh-15 mb-2">{clinicData.name}</h5>
            <span className="mb-3 h-116">
              <SlideText text={currentSlide.text1} index={`1-${index}`} />
              <SlideText text={currentSlide.text2} index={`2-${index}`} />
            </span>
            <span className="mb-3 h-20">
              <h6 className="roboto fz-16 lh-12 text-fade-in" key={`vet-head-text-3-${index}`}>
                {currentSlide.text3}
              </h6>
            </span>
            <Link to="/" className="btn btn-m btn-primary w-135">立即預約</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VetHeader;
