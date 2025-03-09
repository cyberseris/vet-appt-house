import { Link } from "react-router-dom";
import textLogoSvg from "@/assets/images/text-logo.svg";
import textLogoVerticalSvg from "@/assets/images/text-logo-vertical.svg";
import heroDogPng from "@/assets/images/home/hero-dog.png";
import Icon from "../common/Icon";
import { useMobile } from "@/context/MobileContext";

const randomDecorate = Math.floor(Math.random() * 3);
const Header = () => {
  const isMobile = useMobile();

  return (
    <header className="home-header hv100-with-nav bg-secondary d-flex align-items-end">
      <div className="container flex-column gap-8 align-items-center mx-auto">
        <div className="content flex-column align-items-center">
          <div className="title flex-column align-items-center">
            <img
              className="logo"
              src={isMobile ? textLogoVerticalSvg : textLogoSvg}
              alt="預獸屋 Text Logo"
            />
            <p className="fs-5" data-aos="fade-up">
              專業醫療輕鬆預約{isMobile ? <br /> : "，"}貼心守護毛孩健康
            </p>
          </div>
          <div className="action d-flex gap-4">
            <Link
              to="/#find-vet"
              className="btn-m btn-primary"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              搜尋醫院
            </Link>
            <Link
              to="/"
              className="btn-m btn-secondary d-flex"
              data-aos="fade-left"
              data-aos-delay={isMobile ? 600 : 300}
            >
              快速預約
              <Icon fileName={"footprint"} size={24} />
            </Link>
          </div>
        </div>
        <div className={`hero-container deco-${randomDecorate}`}>
          <img src={heroDogPng} alt="Dog" />
        </div>
      </div>
    </header>
  );
};

export default Header;
