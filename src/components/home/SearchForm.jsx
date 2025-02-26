import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../common/Icon";
import DatePicker from "../common/DatePicker";
import DropDownList from "../common/DropDownList";
import { useMobile } from "@/context/MobileContext";

const SearchForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const isMobile = useMobile();

  const onSubmit = (data) => {
    console.log(data);
    reset({
      city: null,
      area: null,
      date: null,
      time: null,
      keyword: "",
      checkboxes: {},
    });
    setSelectedDate(null);
  };

  const options = [
    { value: "台北", label: "台北" },
    { value: "高雄", label: "高雄" },
  ];

  const timeOptions = [
    { value: "早上", label: "早上" },
    { value: "下午", label: "下午" },
    { value: "晚上", label: "晚上" },
    { value: "不限", label: "不限" },
  ];

  return (
    <form
      className="bg-secondary flex-column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-column gap-4">
        <div className="row-group d-flex flex-item-fill gap-3">
          <div className="flex-column gap-1">
            <label className="h6" htmlFor="find-vet-city">
              縣市
            </label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "必須選擇縣市" }}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-city"
                  {...field}
                  options={options}
                  placeholder="請選擇縣市"
                  hasError={errors.city}
                />
              )}
            />
            {errors.city && (
              <p className="text-error fs-6 d-flex align-items-center gap-2">
                <Icon fileName={"error"} size={20} />
                {errors.city.message}
              </p>
            )}
          </div>
          <div className="flex-column gap-1">
            <label className="h6" htmlFor="find-vet-area">
              地區
            </label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-area"
                  {...field}
                  options={options}
                  placeholder="請選擇地區"
                />
              )}
            />
          </div>
        </div>
        <div className="row-group d-flex flex-item-fill gap-3">
          <div className="flex-column gap-1">
            <label className="h6" htmlFor="find-vet-date">
              日期
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  id="find-vet-date"
                  {...field}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
              )}
            />
          </div>
          <div className="flex-column gap-1">
            <label className="h6" htmlFor="find-vet-time">
              時段
            </label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-time"
                  {...field}
                  icon={"clock"}
                  options={timeOptions}
                  placeholder="請選擇時段"
                />
              )}
            />
          </div>
        </div>
        <div className="input-field flex-column gap-1">
          <label className="h6" htmlFor="find-vet-keyword">
            關鍵字搜尋
          </label>
          <Controller
            name="keyword"
            control={control}
            render={({ field }) => (
              <input
                id="find-vet-keyword"
                className="input-text-primary"
                type="text"
                placeholder="請輸入醫院名稱"
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
        </div>
        <div className="flex-column gap-2">
          <span className="h6">其他需求</span>
          <div className="d-flex flex-wrap gap-1d5">
            {[
              "24 小時營業",
              "夜間急診",
              "現場掛號",
              "電話預約",
              "機車停車",
              "汽車停車",
            ].map((label, i) => (
              <label
                className="custom-checkbox d-flex align-items-center gap-2"
                key={`other-req-checkbox-${i}`}
                htmlFor={`other-req-checkbox-${i}`}
              >
                <Controller
                  name={`checkboxes.${label}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      id={`other-req-checkbox-${i}`}
                      type="checkbox"
                      checked={field.value ?? false}
                      {...field}
                    />
                  )}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <button
          className={`btn-${
            isMobile ? "m" : "l"
          } btn-primary d-flex justify-content-center`}
          type="submit"
        >
          <Icon fileName={"search"} size={32} />
          搜尋
          <div style={{ width: "32px" }} />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
