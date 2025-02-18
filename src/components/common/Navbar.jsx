import React from "react";
import { NavLink } from "react-router-dom";
import iconLogoSvg from "@/assets/images/icon-logo.svg";
import textLogoSvg from "@/assets/images/text-logo.svg";

const linkPathList = [
  { name: "搜尋獸醫", path: "/" },
  { name: "快速預約", path: "/" },
  { name: "最新消息", path: "/" },
  { name: "關於我們", path: "/" },
  { name: "寵物管理", path: "/" },
];
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg position-sticky top-0 bg-secondary text-primary">
      <div className="container">
        <NavLink className="brand" to="/">
          <img className="icon-logo" src={iconLogoSvg} alt="預獸屋 Logo icon" />
          <img className="text-logo" src={textLogoSvg} alt="預獸屋 Logo text" />
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {linkPathList.map(({ name, path }, i) => (
              <li className="tab nav-item" key={`nav-link-${i}`}>
                <NavLink className="text-primary h6 d-block" to={path}>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink className="btn-xs btn-tertiary" to="/auth/login">
            登入
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
