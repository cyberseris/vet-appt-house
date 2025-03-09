import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/context/MobileContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "../common/Icon";
import featuredClinic1Png from "@/assets/images/home/featured-clinic-1.png";
import featuredClinic2Png from "@/assets/images/home/featured-clinic-2.png";
import featuredClinic3Png from "@/assets/images/home/featured-clinic-3.png";
import featuredClinic4Png from "@/assets/images/home/featured-clinic-4.png";
import featuredClinic5Png from "@/assets/images/home/featured-clinic-5.png";
import featuredClinic6Png from "@/assets/images/home/featured-clinic-6.png";
import api from "../../services/api";

const rawClinics = [
  {
    id: 1,
    name: "秘境野生動物專科醫院",
    description:
      "專注於迷你豬、刺蝟等特殊動物的診療，配備先進設備和經驗豐富的獸醫團隊。",
    image: featuredClinic1Png,
  },
  {
    id: 2,
    name: "亞各特殊寵物專科醫院",
    description:
      "提供針對兔、鳥類、小型哺乳類、爬蟲類及兩棲類等特殊寵物的專業醫療服務。",
    image: featuredClinic2Png,
  },
  {
    id: 3,
    name: "侏儒紀野生動物專科醫院",
    description:
      "專注於各種非犬貓的特殊寵物醫療，醫院提供商品與獸醫級環境來解決疑難雜症。",
    image: featuredClinic3Png,
  },
  {
    id: 4,
    name: "不萊梅特殊寵物專科醫院",
    description:
      "專注於非犬貓的特殊寵物，包括小型哺乳動物、鳥類及爬蟲類，針對不同需求提供專業診療。",
    image: featuredClinic4Png,
  },
  {
    id: 5,
    name: "阿西特殊寵物專科醫院",
    description:
      "專注於非犬貓的特殊寵物，包括小型哺乳動物、鳥類及爬蟲類，針對不同需求提供專業診療。",
    image: featuredClinic5Png,
  },
  {
    id: 6,
    name: "多冬特特殊寵物專科醫院",
    description:
      "專注於非犬貓的特殊寵物，包括小型哺乳動物、鳥類及爬蟲類，針對不同需求提供專業診療。",
    image: featuredClinic6Png,
  },
];

const ClinicCard = ({ clinic }) => {
  return (
    <div className="card border-0">
      <div className="flex-column gap-3">
        <img src={clinic.image} alt={clinic.name} />
        <div className="flex-column gap-1d5">
          <h5>{clinic.name}</h5>
          <p className="text-tertiary fs-6">{clinic.description}</p>
        </div>
      </div>
      <Link to="" className="btn-s btn-primary">
        立即預約
      </Link>
    </div>
  );
};

const FeaturedClinics = () => {
  const [clinics, setClinics] = useState(rawClinics);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHover, setIsHover] = useState([true, true]);
  const isMobile = useMobile();

  useEffect(() => {
    getFeaturedClinics();
  }, []);

  const getFeaturedClinics = async () => {
    const {
      data: { data },
    } = await api("/vetClinics?limit=6&req=hasExoticPetTreat");
    setClinics(rawClinics.map((c, i) => ({ ...c, ...data[i] })));
  };
  return isMobile ? (
    <div className="flex-column gap-2 align-items-center mt-4">
      {clinics.slice(0, 3).map((clinic, i) => (
        <ClinicCard clinic={clinic} key={`mobile-featured-clinic-${i}`} />
      ))}
      <Link
        className="view-more mt-4 fs-6 text-secondary user-select-none"
        to="/search/result?other=特寵診療"
      >
        查看更多
      </Link>
    </div>
  ) : (
    <div className="container gap-4 d-flex  user-select-none position-relative align-items-center p-0">
      {clinics.length > 0 && (
        <>
          <Link
            to="/search/result?other=特寵診療"
            className="more fs-6 text-secondary text-decoration-none"
          >
            更多
          </Link>
          <button
            className="prev-button"
            style={
              isBeginning
                ? { opacity: "0.4", pointerEvents: "none" }
                : undefined
            }
            onMouseEnter={() => setIsHover((pre) => [false, pre[1]])}
            onMouseLeave={() => setIsHover((pre) => [true, pre[1]])}
          >
            <Icon
              fileName={isHover[0] ? "down-arrow" : "footprint"}
              size={40}
            />
          </button>
          <Swiper
            modules={[Mousewheel, Navigation]}
            navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
            spaceBetween={16}
            slidesPerView={"auto"}
            mousewheel={true}
            onSwiper={(swiper) => {
              try {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
                swiper.on("slideChange", () => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                });
              } catch {}
            }}
          >
            {clinics.map((clinic) => (
              <Slide key={clinic.id}>
                <ClinicCard clinic={clinic} />
              </Slide>
            ))}
          </Swiper>
          <button
            className="next-button"
            style={
              isEnd ? { opacity: "0.4", pointerEvents: "none" } : undefined
            }
            onMouseEnter={() => setIsHover((pre) => [pre[0], false])}
            onMouseLeave={() => setIsHover((pre) => [pre[0], true])}
          >
            <Icon
              fileName={isHover[1] ? "down-arrow" : "footprint"}
              size={40}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default FeaturedClinics;
