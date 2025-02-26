import { useState, useEffect } from "react";
import BtnEdit from "./BtnEdit";
import axios from "axios";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const UserForm = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const url = `${BACKEND_HOST}/users/2`;
        const res = await axios.get(url);
        setUserData(res.data);
      } catch (error) {
        console.log("取得使用者資料失敗");
      }
    })();
  }, []);

  return (
    <>
      <div className="user bg-cover">
        <div className="container">
          <h2 className="title mb-4 mb-lg-5">Welcome, {userData.name}</h2>
          <div className="card p-3 p-lg-5 border-0 rounded-4">
            <form action="">
              <div className="row mb-4">
                <div className="col d-flex align-items-center">
                  <div className="me-1 me-lg-4">
                    <img
                      className="rounded-circle object-fit-cover"
                      src={userData.imageUrl}
                      width="100"
                      height="100"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="mb-1">{userData.name}</p>
                    <p className="text-grey-scale-2"> {userData.email}</p>
                  </div>
                </div>
                <div className="col text-end d-none d-lg-block">
                  <BtnEdit customStyle="px-4" />
                </div>
              </div>
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="col">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input type="text" className="form-control" id="phone" />
                </div>
              </div>
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="birthday" className="form-label">
                    生日
                  </label>
                  <input type="date" className="form-control" id="birthday" />
                </div>
                <div className="col">
                  <label htmlFor="gender" className="form-label">
                    性別
                  </label>
                  <select id="gender" className="form-select">
                    <option selected>女</option>
                    <option>男</option>
                  </select>
                </div>
              </div>
              <div className="row g-3 mb-4 g-lg-4 mb-lg-0">
                <div className="col-lg-6">
                  <label htmlFor="gender" className="form-label">
                    地址
                  </label>
                  <div className="row g-3">
                    <div className="col-12 col-lg-3">
                      <select id="gender" className="form-select">
                        <option selected>女</option>
                        <option>男</option>
                      </select>
                    </div>
                    <div className="col-12 col-lg-3">
                      <select id="gender" className="form-select">
                        <option selected>女</option>
                        <option>男</option>
                      </select>
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        id="birthday"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col"></div> */}
              </div>
              <div className="row d-lg-none">
                <div className="col-12">
                  <BtnEdit customStyle="w-100 rounded-pill" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
