import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { cities, districts } from "../../utils/constants";
import BtnEdit from "./BtnEdit";
import axios from "axios";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

/**
 * UserForm Component
 * 功能：
 * 1. 表單狀態管理：使用 useForm 管理表單狀態，設定驗證模式
 * 2. 編輯模式控制：控制表單是否可編輯
 * 3. 地址欄位處理：管理城市和區域的聯動選擇
 * 4. 表單重置功能：處理取消編輯時的重置邏輯
 * 5. 資料提交處理：處理表單提交和 API 互動
 * 6. 錯誤處理：管理表單驗證和錯誤顯示
 */
const UserForm = () => {
  // 狀態管理
  const [userData, setUserData] = useState({}); // 用於儲存使用者資料
  const [currentCity, setCurrentCity] = useState(""); // 用於儲存當前選擇的城市
  const [isEditing, setIsEditing] = useState(false); // 用於控制表單是否可編輯

  // 表單控制
  const {
    register, //用於註冊表單欄位
    handleSubmit, //用於處理表單提交
    formState: { errors }, //用於管理表單驗證狀態
    reset, //用於重置表單
    setValue, //用於手動設置表單欄位的值
    clearErrors, //用於清除表單錯誤訊息
  } = useForm({
    mode: "onSubmit", // 設定驗證模式為提交時觸發
    defaultValues: {
      // 設定表單欄位的預設值
      name: "",
      phone: "",
      birthday: "",
      gender: "",
      city: "", //address.city
      district: "", //address.district
      address: "", //address.address
    },
  });

  // 初始資料載入
  useEffect(() => {
    (async () => {
      try {
        const url = `${BACKEND_HOST}/users/2`;
        const res = await axios.get(url);
        //console.log("API Response:", res.data);
        setUserData(res.data);
        if (res.data && res.data.address && res.data.address.city) {
          setCurrentCity(res.data.address.city);
          setValue("city", res.data.address.city);
        }
        // 使用 setValue 設置所有表單欄位的初始值
        setValue("name", res.data.name);
        setValue("phone", res.data.phone);
        setValue("birthday", res.data.birthday);
        setValue("gender", res.data.gender);
        setValue("district", res.data.address?.district);
        setValue("address", res.data.address?.address);
      } catch (error) {
        console.log("取得使用者資料失敗", error);
      }
    })();
  }, [setValue]);

  // 監聽城市變更
  useEffect(() => {
    // console.log("Current City:", currentCity);
  }, [currentCity]);

  // 編輯模式控制
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 取消編輯：重置表單並清除錯誤
  const handleCancel = () => {
    setIsEditing(false);
    clearErrors(); // 清除所有錯誤訊息

    // 先重置城市相關的值
    setCurrentCity(userData.address?.city || "");
    setValue("city", userData.address?.city || "");

    // 使用 setValue 重置其他表單值
    setValue("name", userData.name);
    setValue("phone", userData.phone);
    setValue("birthday", userData.birthday);
    setValue("gender", userData.gender);
    setValue("district", userData.address?.district || "");
    setValue("address", userData.address?.address || "");
  };

  // 表單提交處理
  const onSubmit = async (data) => {
    try {
      const url = `${BACKEND_HOST}/users/2`;
      // 格式化提交資料
      const formattedData = {
        name: data.name,
        gender: data.gender,
        phone: data.phone,
        birthday: data.birthday,
        address: {
          city: data.city,
          district: data.district,
          address: data.address,
        },
        email: userData.email,
        password: userData.password,
        imageUrl: userData.imageUrl,
      };
      await axios.put(url, formattedData);
      setUserData(formattedData);
      setIsEditing(false);
    } catch (error) {
      console.log("更新使用者資料失敗", error);
    }
  };

  return (
    <>
      <div className="user bg-cover">
        <div className="container">
          <h2 className="title mb-4 mb-lg-5">Welcome, {userData.name}</h2>
          <div className="card p-3 p-lg-5 border-0 rounded-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 用戶基本資訊區塊 */}
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
                    <p className="mb-1 fs-4 fw-bold">{userData.name}</p>
                    <p className="text-grey-scale-2 fs-5"> {userData.email}</p>
                  </div>
                </div>
                {/* 桌面版編輯按鈕 */}
                <div className="col text-end d-none d-lg-block">
                  <BtnEdit
                    customStyle="px-4"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit(onSubmit)}
                  />
                </div>
              </div>

              {/* 姓名和電話欄位 */}
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="name" className="form-label">
                    姓名
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control ${errors.name && "is-invalid"} `}
                    placeholder="請輸入姓名。"
                    defaultValue={userData.name}
                    disabled={!isEditing}
                    {...register("name", {
                      required: "請輸入姓名。",
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="phone" className="form-label">
                    電話
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-control ${errors.phone && "is-invalid"} `}
                    defaultValue={userData.phone}
                    placeholder="請輸入電話。"
                    disabled={!isEditing}
                    {...register("phone", {
                      required: "請輸入電話。",
                      minLength: {
                        value: 8,
                        message: "電話號碼至少需要 8 碼。",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "電話號碼格式不正確，僅限數字。",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>
              </div>

              {/* 生日和性別欄位 */}
              <div className="row g-3 mb-3 g-lg-4 mb-lg-4">
                <div className="col-lg-6">
                  <label htmlFor="birthday" className="form-label">
                    生日
                  </label>
                  <input
                    id="birthday"
                    type="date"
                    className={`form-select ${
                      errors.birthday && "is-invalid"
                    } `}
                    defaultValue={userData.birthday}
                    disabled={!isEditing}
                    {...register("birthday", {
                      required: "請輸入生日。",
                    })}
                  />
                  {errors.birthday && (
                    <div className="invalid-feedback">
                      {errors.birthday.message}
                    </div>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="gender" className="form-label">
                    性別
                  </label>
                  <select
                    id="gender"
                    defaultValue={userData.gender}
                    className={`form-select ${errors.gender && "is-invalid"} `}
                    disabled={!isEditing}
                    {...register("gender", {
                      required: "請選擇性別。",
                    })}
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    <option value="female">女性</option>
                    <option value="male">男性</option>
                    <option value="unknow">不願透漏</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">
                      {errors.gender.message}
                    </div>
                  )}
                </div>
              </div>

              {/* 地址欄位 */}
              <div className="row g-3 mb-4 g-lg-4 mb-lg-0">
                <div className="col-lg-6">
                  <label className="form-label">地址</label>
                  <div className="row g-3">
                    {/* 城市選擇 */}
                    <div className="col-12 col-lg-3">
                      <select
                        id="city"
                        className={`form-select ${
                          errors.city && "is-invalid"
                        } `}
                        disabled={!isEditing}
                        {...register("city", {
                          required: "請選擇縣市。",
                          onChange: (e) => {
                            setCurrentCity(e.target.value);
                            setValue("district", "");
                          },
                        })}
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {cities.map((item, idx) => (
                          <option value={item.city} key={idx}>
                            {item.city}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <div className="invalid-feedback">
                          {errors.city.message}
                        </div>
                      )}
                    </div>

                    {/* 區域選擇 */}
                    <div className="col-12 col-lg-3">
                      <select
                        id="district"
                        defaultValue={userData.address?.district}
                        className={`form-select ${
                          errors.district && "is-invalid"
                        } `}
                        disabled={!isEditing}
                        {...register("district", {
                          required: "請選擇區域。",
                        })}
                      >
                        <option value="" disabled>
                          請選擇
                        </option>
                        {districts
                          .filter((item) => item.city == currentCity)
                          .map((item, idx) => (
                            <option value={item.dist} key={idx}>
                              {item.dist}
                            </option>
                          ))}
                      </select>
                      {errors.district && (
                        <div className="invalid-feedback">
                          {errors.district.message}
                        </div>
                      )}
                    </div>

                    {/* 詳細地址輸入 */}
                    <div className="col">
                      <input
                        id="address"
                        type="text"
                        className={`form-control ${
                          errors.address && "is-invalid"
                        } `}
                        defaultValue={userData.address?.address || ""}
                        placeholder="請輸入地址。"
                        disabled={!isEditing}
                        {...register("address", {
                          required: "請輸入地址。",
                        })}
                      />
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 手機版編輯按鈕 */}
              <div className="row d-lg-none mt-4">
                <div className="col-12">
                  <BtnEdit
                    customStyle="w-100 rounded-pill"
                    isEditing={isEditing}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit(onSubmit)}
                  />
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
