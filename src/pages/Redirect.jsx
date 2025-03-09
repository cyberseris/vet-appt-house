import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CatLoading from "@/components/common/CatLoading";
import { toast } from "react-toastify";

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/nearby") {
      navigator;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            try {
              const { data } = await axios(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=zh-TW`
              );

              const city =
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                "";
              const district =
                data.address?.suburb ||
                data.address?.borough ||
                data.address?.city_district ||
                "";
              navigate(`/search/result?city=${city}&area=${district}`);
            } catch {
              toast("位置查閱失敗", {
                className: "toast-error",
                toastId: "geolocation-error",
              });
              navigate("/");
            }
          },
          (err) => {
            console.error(err.message);
            toast("瀏覽器無法定位", {
              className: "toast-error",
              toastId: "geolocation-error",
            });
            navigate("/");
          }
        );
      } else {
        toast("瀏覽器不支援定位", {
          className: "toast-error",
          toastId: "geolocation-error",
        });
        navigate("/");
      }
    } else if (location.pathname === "/veterinary") {
      toast("請指定醫院", {className: "toast-primary"})
      navigate("/search");
    } else {
      navigate("/404");
    }
  }, [location.pathname]);

  return (
    <div className="hv100-nav-n-foot flex-column justify-content-center align-items-center text-tertiary p-1">
      <h3>{location.pathname === "/nearby" ? "查 詢 中" : "頁面重新導向中"}</h3>
      <CatLoading />
    </div>
  );
};

export default Redirect;
