import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import dateSvg from "@/assets/icons/date.svg";

const CustomDateInput = forwardRef(({ value, onClick, id }, ref) => (
  <div className="custom-date-picker" onClick={onClick} ref={ref}>
    <input
      id={id}
      className="date-picker"
      placeholder="請選擇日期"
      type="text"
      value={value}
      readOnly
    />
    <img
      src={dateSvg}
      className="position-absolute"
      style={{
        width: 24,
        top: "50%",
        right: "1rem",
        transform: "translateY(-50%)",
      }}
    />
  </div>
));

const CustomDatePicker = forwardRef(({ ...props }, ref) => (
  <DatePicker
    ref={ref}
    {...props}
    dateFormat="yyyy/MM/dd"
    calendarClassName="date-picker-calendar"
    customInput={<CustomDateInput />}
  />
));

export default CustomDatePicker;
