import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../common/Icon";
import DropDownList from "../common/DropDownList";

const SearchForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const options = [
    { value: "taipei", label: "台北" },
    { value: "kaohsiung", label: "高雄" },
  ];

  const timeOptions = [
    { value: "morning", label: "早上" },
    { value: "afternoon", label: "下午" },
    { value: "night", label: "晚上" },
  ];

  const handleReset = () => {
    reset();
  };

  return (
    <form
      className="bg-secondary flex-column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-column gap-4">
        <div className="d-flex flex-item-fill gap-3">
          <div className="flex-column gap-1">
            <label className="h6">縣市</label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "縣市 is required" }}
              render={({ field }) => (
                <DropDownList {...field} options={options} />
              )}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div className="flex-column gap-1">
            <label className="h6">地區</label>
            <Controller
              name="area"
              control={control}
              rules={{ required: "地區 is required" }}
              render={({ field }) => (
                <DropDownList {...field} options={options} />
              )}
            />
            {errors.area && <p>{errors.area.message}</p>}
          </div>
        </div>
        <div className="d-flex  flex-item-fill gap-3">
          <div className="flex-column gap-1">
            <label className="h6">日期</label>
            <Controller
              name="date"
              control={control}
              rules={{ required: "日期 is required" }}
              render={({ field }) => (
                <DatePicker
                  className="date-picker fs-6"
                  placeholderText="請選擇日期"
                  {...field}
                />
              )}
            />
            {errors.date && <p>{errors.date.message}</p>}
          </div>
          <div className="flex-column gap-1">
            <label className="h6">時段</label>
            <Controller
              name="timeSlot"
              control={control}
              rules={{ required: "時段 is required" }}
              render={({ field }) => (
                <DropDownList {...field} options={timeOptions} />
              )}
            />
            {errors.timeSlot && <p>{errors.timeSlot.message}</p>}
          </div>
        </div>
        <div className="input-field flex-column gap-1">
          <label className="h6">關鍵字搜尋</label>
          <Controller
            name="searchKeyword"
            control={control}
            render={({ field }) => (
              <input
                className="input-text-primary"
                type="text"
                placeholder="請輸入醫院名稱"
                {...field}
              />
            )}
          />
        </div>
        <div className="flex-column gap-2">
          <label className="h6">其他需求</label>
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
          className="btn-l btn-primary d-flex justify-content-center"
          type="submit"
        >
          <Icon fileName={"search"} size={32} />
          搜尋
          <div style={{ width: "32px" }} />
        </button>
        {/* <button type="button" onClick={handleReset}>重置</button> */}
      </div>
    </form>
  );
};

export default SearchForm;
