import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import iconLogoSvg from "@/assets/images/icon-logo.svg";
import textLogoSvg from "@/assets/images/text-logo.svg";
import Avatar from "./Avatar";

const linkPathList = [
  { name: "搜尋獸醫", path: "/#find-vet" },
  { name: "快速預約", path: "/" },
  { name: "最新消息", path: "/#news" },
  { name: "關於我們", path: "/" },
  { name: "寵物管理", path: "/" },
];

const user = null;
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAboveHeader, setIsAboveHeader] = useState(true);

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
    const element = document.getElementById(location.hash?.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      navigate(location.pathname, { replace: true });
    }
  }, [location.hash]);

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
