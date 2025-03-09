import { forwardRef } from "react";
import Select from "react-select";
import dropDownArrowSvg from "@/assets/icons/drop-down-arrow.svg";
import clockSvg from "@/assets/icons/clock.svg";

const customStyles = (hasError) => ({
  control: (base, { isFocused, isDisabled }) => ({
    ...base,
    cursor: isDisabled ? "not-allowed" : "pointer",
    userSelect: isDisabled ? "none" : "default",
    backgroundColor: isDisabled ? " #f9f9f9" : "#ffffff",
    borderRadius: "0.5rem",
    border: "none",
    outline: hasError
      ? "1px solid #BA0000"
      : isFocused
      ? "1px solid #82AAD6"
      : "none",
    padding: "6px 1rem",
  }),
  placeholder: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled ? "#9b9b9b" : hasError ? "#BA0000" : "#595959",
  }),
  menu: (base) => ({
    ...base,
    boxShadow: "0px 5px 10px 0px #00000040",
    padding: "0.5rem 0",
    marginTop: "2px",
    borderRadius: "0.5rem",
  }),
  option: (base, { isSelected }) => ({
    ...base,
    padding: "0.5rem 1rem",
    backgroundColor: isSelected ? "#D5E7Ff" : "inherit",
    color: "#595959",
    ":hover": {
      backgroundColor: "#E6EFFB",
      color: "#595959",
    },
  }),
  singleValue: (base) => ({
    ...base,
    padding: "0",
    margin: "0",
    color: hasError ? "#BA0000" : "#0A0A0A",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),
  clearIndicator: (base, state) => ({
    ...base,
    padding: "2px",
  }),
});

const DropdownIndicator = ({ selectProps }) => {
  const isClockIcon = selectProps.icon === "clock";
  return (
    <div style={{ padding: "0" }}>
      <img
        src={isClockIcon ? clockSvg : dropDownArrowSvg}
        alt="下拉選單箭頭圖示"
        width={24}
        onError={(e) => e.target.classList.add("d-none")}
        onLoad={(e) => e.target.classList.remove("d-none")}
      />
      <span className="img-alt" style={{ padding: "7px", fontSize: "10px" }}>
        ⯆
      </span>
    </div>
  );
};

const customComponents = { DropdownIndicator, IndicatorSeparator: () => null };

const DropDownList = forwardRef(
  ({ hasError = false, className = "", ...prop }, ref) => {
    return (
      <Select
        ref={ref}
        {...prop}
        className={`fs-6 ${className}`}
        styles={customStyles(hasError)}
        components={customComponents}
      />
    );
  }
);

export default DropDownList;
