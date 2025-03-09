import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "@/assets/images/icon-logo.svg";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center user-select-none">
      <div>
        <h1 className="display-3 text-error d-flex justify-content-center align-items-center gap-3">
          404 <img src={LogoSvg} alt="Site Logo" style={{ width: "50px" }} />
        </h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-3">
          你所尋找的頁面不存在本站
          <br />
          10秒後自動轉跳至首頁
        </p>
        <button className="btn btn-primary border-0" onClick={() => navigate("/")}>
          返回首頁
        </button>
      </div>
    </div>
  );
};

export default NotFound;
