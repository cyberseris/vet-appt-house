import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import iconLogoSvg from "@/assets/images/icon-logo.svg";
import textLogoSvg from "@/assets/images/text-logo.svg";
import Avatar from "./Avatar";
import clawMarksTop from "@/assets/images/navbar/claw-marks1.svg";
import clawMarksMiddle from "@/assets/images/navbar/claw-marks2.svg";
import clawMarksBottom from "@/assets/images/navbar/claw-marks3.svg";
import Icon from "./Icon";
import { computedTo } from "../../utils/common";

const linkPathList = [
  { name: "搜尋獸醫", path: "/search" },
  { name: "快速預約", path: "/" },
  { name: "最新消息", path: "/#news" },
  { name: "關於我們", path: "/about-us" },
  { name: "寵物管理", path: "/user/pets" },
];

const user = null;
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAboveHeader, setIsAboveHeader] = useState(true);
  const navMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".home-header");
      if (header) {
        const headerTop = header.offsetHeight;
        setIsAboveHeader(window.scrollY < headerTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsAboveHeader(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash?.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        navigate(location.pathname, { replace: true, state: { hash: true } });
      }
    } else {
      if (location.state?.hash) return;
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <nav className="navbar navbar-expand-lg position-sticky top-0 bg-secondary text-primary">
      <div className="container">
        <NavLink
          className="brand"
          to="/"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: location.pathname === "/" ? "smooth" : "instant",
            })
          }
        >
          <img className="icon-logo" src={iconLogoSvg} alt="預獸屋 Logo icon" />
          <img
            className="text-logo"
            src={textLogoSvg}
            alt="預獸屋 Logo text"
            style={isAboveHeader ? { visibility: "hidden" } : undefined}
          />
        </NavLink>
        <button
          ref={navMenuRef}
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => navMenuRef.current.focus()}
        >
          {/* <span className="navbar-toggler-icon"></span> */}
          <div className="nav-menu flex-column align-items-center text-secondary">
            <Icon className="cw-t" src={clawMarksTop} width={40} height={7.5} />
            <Icon
              className="cw-m"
              src={clawMarksMiddle}
              width={40}
              height={7.5}
            />
            <Icon
              className="cw-b"
              src={clawMarksBottom}
              width={40}
              height={7.5}
            />
          </div>
        </button>
        <div
          className="collapse-content collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            {linkPathList.map(({ name, path }, i) => (
              <li className="tab nav-item" key={`nav-link-${i}`}>
                <NavLink
                  className="text-primary h6 d-block"
                  to={computedTo(path, location)}
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
          {user ? (
            <NavLink className="profile text-decoration-none" to="/user">
              <Avatar info={user} size={36} />
            </NavLink>
          ) : (
            <NavLink className="btn-xs btn-tertiary" to="/login">
              登入
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
