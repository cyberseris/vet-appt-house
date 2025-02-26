import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMobile } from "@/context/MobileContext";
import iconLogoSvg from "@/assets/images/icon-logo.svg";
import textLogoSvg from "@/assets/images/text-logo.svg";
import sleepCatPng from "@/assets/images/sleep-cat.png";

const linkPathList = [
  { name: "快速預約", path: "/" },
  {
    name: "搜尋醫院",
    path: "/",
    children: [
      { name: "精選醫院", path: "/" },
      { name: "附近醫院", path: "/" },
    ],
  },
  {
    name: "所有消息",
    path: "/",
    children: [
      { name: "最新消息", path: "/" },
      { name: "活動消息", path: "/" },
      { name: "熱門消息", path: "/" },
    ],
  },
  {
    name: "關於我們",
    path: "/",
    children: [
      { name: "聯絡我們", path: "/" },
      { name: "網站特色", path: "/" },
    ],
  },
  {
    name: "會員中心",
    path: "/",
    children: [
      { name: "我的寵物", path: "/" },
      { name: "我的預約", path: "/" },
    ],
  },
];

const copyright = (
  <div className="copyright fs-6">
    Copyright © {new Date().getFullYear()} 預獸屋
  </div>
);

const brand = (
  <Link className="brand" to="/">
    <img className="icon-logo" src={iconLogoSvg} alt="預獸屋 Logo icon" />
    <img className="text-logo" src={textLogoSvg} alt="預獸屋 Logo text" />
  </Link>
);
const FooterLinks = ({ isMobile }) => (
  <div className={`d-flex ${isMobile ? "gap-1 flex-wrap justify-content-center" : "link-container"}`}>
    {linkPathList.map(({ name, path, children }, i) => (
      <div className={isMobile ? "mobile-link" : "col list p-0 flex-column gap-4"} key={i}>
        <h6>
          <Link className="link text-decoration-none text-primary d-block" to={path}>
            {name}
          </Link>
        </h6>
        {!isMobile && children && (
          <ul className="flex-column gap-1">
            {children.map(({ name, path }, j) => (
              <li key={j}>
                <Link className="link fs-6 text-decoration-none text-primary d-block" to={path}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
);

const Footer = () => {
  const location = useLocation();
  const isMobile = useMobile();

  return (
    <footer className="footer">
      {isMobile ? (
        <>
          {brand}
          <FooterLinks isMobile />
          {copyright}
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div className="footer-left flex-column justify-content-between">
              {brand}
              {copyright}
            </div>
            <FooterLinks />
          </div>
          {location.pathname === "/" && <img className="footer-decoration" src={sleepCatPng} />}
        </>
      )}
    </footer>
  );
};

export default Footer;
