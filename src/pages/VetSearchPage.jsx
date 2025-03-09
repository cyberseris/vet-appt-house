import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMobile } from "@/context/MobileContext";
import DropDownList from "@/components/common/DropDownList";
import DatePicker from "@/components/common/DatePicker";
import Paginator from "../components/common/Paginator";
import Icon from "@/components/common/Icon";
import { cities, cityQueryDistricts as districts } from "@/utils/constants";
import { toQueryString, toApiQueryString } from "@/utils/common";
import api from "@/services/api";

const cityOptions = cities.map(({ city }) => ({ label: city, value: city }));

const VetSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMobile();
  const [selectedDate, setSelectedDate] = useState(null);
  const [distOptions, setDistOptions] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [results, setResults] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const city = watch("city");
  const area = watch("area");

  const timeOptions = [
    { value: "AM", label: "09:00 - 12:00" },
    { value: "PM", label: "14:00 - 17:00" },
    { value: "EV", label: "19:00 - 22:00" },
  ];

  const isResultPage = location.pathname.includes("/search/result");

  useEffect(() => {
    if (isResultPage) {
      const params = Object.fromEntries(searchParams);

      for (const [key, value] of Object.entries(params)) {
        if (!value) continue;

        switch (key) {
          case "city":
          case "area":
            setValue(key, { label: value, value });
            break;
          case "time":
            setValue(
              key,
              timeOptions.find((o) => o.value === value)
            );
            break;
          case "keyword":
            setValue(key, value);
            break;
          case "date":
            const date = new Date(value);
            setSelectedDate(date);
            setValue(key, date);
            break;
          case "other":
            value
              .split(",")
              .forEach((req) => setValue(`checkboxes.${req}`, true));
            break;
        }
      }
    }
    fetchResults();
  }, []);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    if (
      city?.value &&
      !(params?.city === city?.value && params?.area === area?.value)
    )
      setValue("area", null);
    setDistOptions(
      city?.value
        ? districts[city.value].map(({ dist }) => ({
            label: dist,
            value: dist,
          }))
        : null
    );
  }, [city]);

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const onSubmit = async (data) => {
    const query = toQueryString(data);
    isResultPage ? setSearchParams(query) : navigate(`/search/result?${query}`);
  };

  const fetchResults = async (page = 1) => {
    try {
      const params = Object.fromEntries(searchParams);
      const query = toApiQueryString(params);
      const {
        data: {
          data,
          pagination: { totalPages, current },
        },
      } = await api.get(
        `/vetClinics?limit=${isMobile ? 8 : 12}&tag=true&page=${page}&${query}`
      );
      setResults(data);
      setCurrentPage(current);
      setTotalPages(totalPages);
      if (isMobile) {
        const resultEle = document.querySelector(".clinic-results");
        resultEle && resultEle.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="vet-search hv100-with-nav">
      <div className="vet-search-container mx-auto">
        <form
          className={`bg-secondary mx-auto ${isResultPage ? "" : "no-results"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid-item-1 flex-column gap-1">
            <label className="h6 d-flex gap-2" htmlFor="find-vet-city">
              縣市
              {errors.city && (
                <span className="text-error h6-6 d-flex align-items-center gap-1 ms-auto">
                  <Icon fileName={"error"} size={20} />
                  {errors.city.message}
                </span>
              )}
            </label>
            <Controller
              name="city"
              control={control}
              rules={{ required: "必選" }}
              render={({ field }) => (
                <DropDownList
                  inputId="find-vet-city"
                  {...field}
                  options={cityOptions}
                  placeholder="請選擇縣市"
                  hasError={errors.city}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </div>
          <div className="grid-item-2 flex-column gap-1">
            <label className="h6" htmlFor="find-vet-area">
              地區
            </label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <DropDownList
                  isDisabled={distOptions === null}
                  inputId="find-vet-area"
                  {...field}
                  options={distOptions}
                  placeholder={
                    distOptions === null ? "請先選擇縣市" : "請選擇地區"
                  }
                  isClearable
                />
              )}
            />
          </div>
          <div className="grid-item-3 input-field flex-column gap-1">
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
          <button
            className="grid-button btn-quaternary fs-6 justify-content-center align-items-center gap-1"
            type="submit"
          >
            搜尋
            <Icon fileName={"search"} size={20} />
          </button>
          <div className="grid-item-4 flex-column gap-1">
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
                  onChange={(date) => {
                    setSelectedDate(date);
                    setValue("date", date);
                  }}
                  isClearable
                />
              )}
            />
          </div>
          <div className="grid-item-5 flex-column gap-1">
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
                  isClearable
                />
              )}
            />
          </div>
          <div className="grid-item-6 checkbox-group d-flex flex-wrap">
            {[
              "24HR營業",
              "夜間急診",
              "現場掛號",
              "電話預約",
              "停車空間",
              "特寵診療",
            ].map((label, i) => (
              <label
                className="custom-checkbox d-flex align-items-center gap-1"
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
            <button
              className="btn-2 btn-quaternary fs-6 justify-content-center align-items-center gap-1"
              type="submit"
            >
              搜尋
              <Icon fileName={"search"} size={20} />
            </button>
          </div>
        </form>
        {isResultPage && (
          <>
            <div className="clinic-results w-100 mx-auto">
              {results.map((clinic) => (
                <div
                  key={clinic.id}
                  title={clinic.name}
                  className="clinic-card flex-column gap-2"
                >
                  <ruby className="clinic-name h5">
                    {clinic.name} <rp>(</rp>
                    <rt>
                      {clinic.city} {clinic.district}
                    </rt>
                    <rp>)</rp>
                  </ruby>
                  <p className="h6 text-tertiary d-flex align-items-center gap-1">
                    <Icon fileName="phone" size={15} />
                    {clinic.tel || "電話尚未提供"}
                  </p>
                  <div className="tags d-flex flex-wrap gap-1">
                    {clinic.tags?.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-1">
                    <span
                      className="view-detail fs-6"
                      onClick={() =>
                        navigate(`/veterinary/${clinic.id}`, { state: clinic })
                      }
                    >
                      查看詳細資料
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <Paginator
                className="mt-4"
                currentPage={currentPage}
                onPageChange={fetchResults}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VetSearchPage;
