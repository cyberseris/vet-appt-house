import "@/assets/styles/component_import_styles/CatLoading.scss";

const CatLoading = ({
  size = 200,
  type = 1,
  className = "",
  style,
  ...prop
}) => {
  const num = isNaN(type) || ![1, 2, 3, 4].includes(type) ? 1 : type;
  return (
    <div
      {...prop}
      className={`cat-loader cat${num} ${className}`}
      style={{ display:"inline-block", width: size, height: size, ...style }}
    >
      <div className="cat__body"></div>
      <div className="cat__body"></div>
      <div className="cat__body"></div>
      <div className="cat__tail"></div>
      <div className="cat__head"></div>
    </div>
  );
};

export default CatLoading;
