import Select from "react-select";

const customStyles = {
  control: (base, { isFocused, isDisabled, hasError }) => ({
    ...base,
    backgroundColor: isDisabled ? "#f8f9fa" : "white",
    borderColor: hasError
      ? "#dc3545"
      : isFocused
      ? "#80bdff"
      : "#ced4da",
    boxShadow: isFocused
      ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
      : "none",
    cursor: isDisabled ? "not-allowed" : "pointer",
    borderRadius: "0.5rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6c757d",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  singleValue: (base) => ({
    ...base,
    color: "#495057",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "8px",
  }),
}

const DropDownList = ({ options, isDisabled, hasError }) => {
  return (
    <Select
      options={options}
      styles={customStyles}
      isDisabled={isDisabled}
      classNamePrefix={hasError ? "react-select-error" : ""}
    />
  );
};

export default DropDownList;
