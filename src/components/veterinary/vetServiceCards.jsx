import multiAnimalImg from "@/assets/images/veterinary/8.jpg";
import multiDisImg from "@/assets/images/veterinary/1.jpg";
import homeVisitImg from "@/assets/images/veterinary/9.jpg";
import emergencyImg from "@/assets/images/veterinary/10.jpg";

const VetServiceCards = ({ clinicData }) => {
  if (!clinicData) return null;

  const services = [
    clinicData.treatedAnimals?.length > 3 && {
      title: "多物種專業診療",
      content: `專治${clinicData.treatedAnimals
        .map(({ species }) => species)
        .join("、")}，針對不同寵物需求，提供全面且細緻的專業醫療服務。`,
      imgUrl: multiAnimalImg,
    },
    clinicData.hasMultiDisTreat && {
      title: "多科專業診療",
      content: `涵蓋${clinicData.services
        ?.map(({ service }) => service)
        .slice(0, 5)
        .join("、")}等多項醫療服務，以專業診療方案照顧毛孩的全方位健康需求。`,
      imgUrl: multiDisImg,
    },
    clinicData.HomeVisit && {
      title: "到府出診",
      content:
        "無需奔波，專業醫療團隊到府服務，讓毛孩在熟悉環境中獲得最佳照護。",
      imgUrl: homeVisitImg,
    },
    clinicData.hasEmergency && {
      title: "24 小時急診",
      content: "全年無休的急診服務，緊急時刻第一時間為毛孩提供救助與關懷。",
      imgUrl: emergencyImg,
    },
  ].filter(Boolean);

  return services.length ? (
    <section className="vetService bg-secondary">
      <div className="container">
        <div className="section-title mb-5">
          <h3>診療服務</h3>
        </div>
        <div className="row justify-content-center">
          {services.map(({ title, content, imgUrl }, i) => (
            <div className="serviceCard col-md-6 col-xl-3" key={i}>
              <div className="card primary-blue-5 border-0 h-100">
                <img
                  src={imgUrl}
                  className="card-img-top borderRadius-20"
                  alt={title}
                />
                <div className="card-body p-24 d-flex flex-column">
                  <span className="card-title roboto fz-20 lh-15 fw-600 mb-16">
                    {title}
                  </span>
                  <span className="card-text roboto fz-16 lh-15 fw-400">
                    {content}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default VetServiceCards;
