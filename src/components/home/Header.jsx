import { Link } from "react-router-dom";
import textLogoSvg from "@/assets/images/text-logo.svg";
import heroDogPng from "@/assets/images/home/hero-dog.png";
import Icon from "../common/Icon";

const randomDecorate = Math.floor(Math.random() * 3);
const Header = () => {
  return (
    <header className="home-header hv100-with-nav bg-secondary d-flex align-items-end">
      <div className="flex-column gap-8 align-items-center mx-auto">
        <div className="flex-column gap-5 align-items-center">
          <div className="flex-column gap-4">
            <img className="logo" src={textLogoSvg} alt="預獸屋 Text Logo" />
            <p className="fs-5">專業醫療輕鬆預約，貼心守護毛孩健康</p>
          </div>
          <div className="d-flex gap-4">
            <Link to="/" className="btn-m btn-primary">
              搜尋醫院
            </Link>
            <Link to="/" className="btn-m btn-secondary d-flex">
              快速預約
              <Icon fileName={"search"} size={24} />
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
