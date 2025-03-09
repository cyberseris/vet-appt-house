import { useEffect, useState } from "react";
import { useMobile } from "@/context/MobileContext";
import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Icon from "@/components/common/Icon";
import api from "@/services/api";
import Avatar from "../components/common/Avatar";

function getAge(dateString) {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return isNaN(age) ? "未知" : `${age} 歲`;
}

function calcWeight(weight) {
  if (isNaN(+weight)) return "未知";
  return weight >= 1000 ? `${weight / 1000} kg` : `${weight} g`;
}
const PetCard = ({ pet }) => (
  <div className="pet-card d-inline-flex">
    <Avatar
      info={{ name: pet.name, avatar: pet.imageUrl }}
      style={{ borderRadius: "16px" }}
      size={356}
    />
    <div className="info flex-column">
      <div className="title flex-column">
        <div className="d-flex justify-content-between">
          <h2 className="pet-name">{pet.name}</h2>
          <button className="edit-btn-desk">
            <Icon fileName="edit" />
            <span className="fs-6">編輯</span>
          </button>
        </div>
        <h6 className="specie text-tertiary">
          {pet?.specie?.species}&nbsp;&nbsp;{pet?.specie?.scientificName}
        </h6>
      </div>
      <div className="detail flex-column flex-item-fill">
        <div className="d-flex gap-4 flex-item-fill">
          <div className="field flex-column">
            <label className="text-tertiary">年齡</label>
            <span className="fs-6">{getAge(pet.birthday)}</span>
          </div>
          <div className="field flex-column">
            <label className="text-tertiary">生日</label>
            <span className="fs-6">{pet.birthday?.replaceAll("-", " / ")}</span>
          </div>
        </div>
        <div className="d-flex gap-4 flex-item-fill">
          <div className="field flex-column">
            <label className="text-tertiary">體重</label>
            <span className="fs-6">{calcWeight(pet.weight)}</span>
          </div>
          <div className="field flex-column">
            <label className="text-tertiary">血型</label>
            <span className="fs-6">{pet.bloodType || "-"}</span>
          </div>
        </div>
        <div className="d-flex gap-4 flex-item-fill">
          <div className="field flex-column">
            <label className="text-tertiary">性別</label>
            <span className="fs-6">
              {{ male: "男", female: "女" }[pet.gender] || "未知"}
            </span>
          </div>
          <div className="field flex-column">
            <label className="text-tertiary">是否已結紮</label>
            <span className="fs-6">{pet.isLigated ? "是" : "否"}</span>
          </div>
        </div>
        <div className="field flex-column">
          <label className="text-tertiary">是否植入晶片</label>
          <span className="fs-6">{pet.hasChip ? "是" : "否"}</span>
        </div>
      </div>
    </div>
    <button className="edit-btn-mobile fs-6 btn-s">
      <Icon fileName="edit" />
      <span className="fs-6">編輯</span>
    </button>
  </div>
);

const PetPage = () => {
  const [pets, setPets] = useState([]);
  const isMobile = useMobile();
  const [mobileCurrentCard, setMobileCurrentCard] = useState(6);

  useEffect(() => {
    getPets();
  }, []);

  const getPets = async () => {
    const { data } = await api("/pets?userId=2&_expand=specie");
    setPets(data);
  };

  return (
    <div className="my-pets">
      <header className="text-center">
        <h1
          className={`${
            isMobile ? "d2" : "d1"
          } text-secondary user-select-none`}
        >
          我的寵物
        </h1>
      </header>
      <section className="pet-list">
        {isMobile ? (
          <>
            {pets.slice(0, mobileCurrentCard).map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}

            {pets.length > mobileCurrentCard && (
              <div
                className="view-more fs-6 text-secondary user-select-none"
                role="button"
                onClick={() => setMobileCurrentCard((pre) => pre + 1)}
              >
                查看更多
              </div>
            )}
          </>
        ) : (
          <div className="poker-box flex-column align-items-center gap-4">
            {pets.length > 0 && (
              <>
                <Swiper
                  effect="coverflow"
                  grabCursor
                  centeredSlides
                  slidesPerView={3}
                  spaceBetween={"-50%"}
                  loop={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: false,
                    scale: 0.1,
                  }}
                  pagination={{ el: ".outside-pagination", clickable: true }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="pat-card-swiper"
                  navigation={{
                    nextEl: ".next-button",
                    prevEl: ".prev-button",
                  }}
                >
                  {pets.map((pet) => (
                    <Slide key={pet.id}>
                      <PetCard pet={pet} />
                    </Slide>
                  ))}
                </Swiper>
                <div className="poker-navigator d-flex gap-2 p-2">
                  <button className="prev-button flex-column">
                    <Icon fileName="foot-arrow" size={24} />
                  </button>
                  <span className="outside-pagination"></span>
                  <button className="next-button">
                    <Icon fileName="foot-arrow" size={24} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default PetPage;
