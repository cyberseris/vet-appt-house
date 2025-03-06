import { useState, useEffect } from "react";
import { Swiper, SwiperSlide as Slide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardAppoint from "./CardAppoint";
import axios from "axios";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserAppointments = () => {
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const url = `${BACKEND_HOST}/appointments?usersId=2&_expand=users&_expand=vetClinics&_expand=pets`;
        const res = await axios.get(url);
        setAppointmentsData(res.data);
      } catch (error) {
        console.log("取得預約資料失敗");
      }
    })();
  }, []);

  return (
    <>
      <div className="userAppointments bg-cover">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div></div>
            <h3 className="section-title text-secondary">預約紀錄</h3>
            {appointmentsData && appointmentsData.length > 0 ? (
              <a className="fs-6 d-none d-lg-block" href="/">
                查看全部
              </a>
            ) : (
              ""
            )}
          </div>

          {appointmentsData && appointmentsData.length == 0 ? (
            <p className="text-center">目前沒有預約資料</p>
          ) : (
            <>
              <div className="row d-lg-none">
                <div className="col">
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">即將到來</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已預約")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">已到診</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已到診")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                  <div className="row g-3 mb-5">
                    <div className="col-12">
                      <h5 className="d-lg-none">已取消</h5>
                    </div>
                    <div className="col">
                      <Swiper
                        modules={[Mousewheel]}
                        spaceBetween={16}
                        slidesPerView={"auto"}
                        mousewheel={true}
                      >
                        {appointmentsData
                          .filter((item) => item.status == "已取消")
                          .map((item) => (
                            <Slide key={item.id}>
                              <CardAppoint data={item} />
                            </Slide>
                          ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-none d-lg-block">
                <ul className="appoint-tags d-flex mb-4">
                  <li>
                    <a role="button" className="rounded-pill active">
                      即將到來
                    </a>
                  </li>
                  <li>
                    <a role="button" className="rounded-pill">
                      已到診
                    </a>
                  </li>
                  <li>
                    <a role="button" className="rounded-pill">
                      已取消
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col">
                    <Swiper
                      modules={[Mousewheel]}
                      spaceBetween={16}
                      slidesPerView={"auto"}
                      mousewheel={true}
                    >
                      {appointmentsData.map((item) => (
                        <Slide key={item.id}>
                          <CardAppoint data={item} />
                        </Slide>
                      ))}
                    </Swiper>
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

export default UserAppointments;
