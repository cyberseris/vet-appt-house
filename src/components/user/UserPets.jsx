import { useState, useEffect } from "react";
import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import Icon from "../common/Icon";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserPets = () => {
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = `${BACKEND_HOST}/users/2/pets?userId=2`;
        const res = await axios.get(url);
        setPetsData(res.data);
      } catch (error) {
        console.log("取得寵物資料失敗");
      }
    })();
  }, []);

  return (
    <>
      <div className="userPrts bg-cover" id="pets">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">我的寵物</h3>
            {petsData && petsData.length > 0 ? (
              <a className="fs-6 d-none d-lg-block" href="/">
                查看全部
              </a>
            ) : (
              ""
            )}
          </div>
          {/*  */}
          {petsData && petsData.length == 0 ? (
            <a role="button">
              <div className="card p-3 rounded-4 border-0">
                <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                  <div className="align-items-center justify-content-center d-flex ">
                    <Icon fileName={"add-circle"} size={24} />
                    <span className="ms-4">新增寵物</span>
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <>
              <div className="row g-3">
                <div className="col-12 col-lg-1 order-1">
                  {/* 新增寵物按鈕 start */}
                  <a role="button">
                    <div className="add-pet card p-3 rounded-4 border-0 h-100">
                      <div className="card-body align-items-lg-center justify-content-lg-center d-lg-flex p-0 text-center">
                        <span className="align-items-center justify-content-center d-flex ">
                          <Icon fileName={"add-circle"} size={24} />
                          <span className="ms-4 ms-lg-0 mt-lg-4">新增寵物</span>
                        </span>
                      </div>
                    </div>
                  </a>
                  {/* 新增寵物按鈕 end */}
                </div>
                <div className="col">
                  <div className="row row-cols-1 row-cols-lg-4 g-3">
                    {petsData.map((item) => (
                      <div className="col" key={item.id}>
                        <div className="card p-3 rounded-4 border-0 ">
                          <img
                            src={item.imageUrl}
                            className="card-img-top rounded-3 object-fit-cover"
                            alt=""
                            height={200}
                          />
                          <div className="card-body pb-0">
                            <h5 className="text-center mb-1 d-flex align-items-center justify-content-center">
                              {item.name}
                              <Icon fileName={item.gender} size={24} />
                            </h5>
                            <p className="card-text text-grey-scale-2 text-center">
                              {item.age}
                            </p>
                            <button className="btn btn-primary w-100 rounded-pill mt-3 py-2">
                              查看詳情
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row mt-4 d-block d-lg-none">
                <div className="col-12 text-center">
                  <a className="fs-6 p-3" href="/">
                    查看全部
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPets;
