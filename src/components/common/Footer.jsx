import React from "react";
import { Link } from "react-router-dom";
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
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-content">
          <div className="col flex-column justify-content-between">
            <Link className="brand" to="/">
              <img
                className="icon-logo"
                src={iconLogoSvg}
                alt="預獸屋 Logo icon"
              />
              <img
                className="text-logo"
                src={textLogoSvg}
                alt="預獸屋 Logo text"
              />
            </Link>
            <div className="copyright fs-6">
              Copyright © {new Date().getFullYear()} 預獸屋
            </div>
          </div>
          <div className="col d-flex">
            <div className="row link-container">
              {linkPathList.map(({ name, path, children }, i) => (
                <div
                  className="col list text-start p-0 flex-column gap-4"
                  key={`foot-link-${i}`}
                >
                  <h6>
                    <Link className="link text-decoration-none text-primary d-block" to={path}>
                      {name}
                    </Link>
                  </h6>
                  {children && (
                    <ul className="flex-column gap-1d5">
                      {children.map(({ name, path }, j) => (
                        <li key={`foot-link-${i}-${j}`}>
                          <Link
                            className="link fs-6 text-decoration-none text-primary d-block"
                            to={path}
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img className="footer-decoration" src={sleepCatPng} />
    </footer>
  );
};

export default Footer;
