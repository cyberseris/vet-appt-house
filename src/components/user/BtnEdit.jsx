import Icon from "../common/Icon";

function BtnEdit({ customStyle }) {
  let style =
    " btn btn-outline-primary align-items-center d-inline-flex justify-content-center ";
  if (customStyle) {
    style = style + customStyle;
  }

  return (
    <button type="submit" className={style}>
      <Icon fileName={"edit"} size={20} />
      <span className="ms-1">編輯</span>
    </button>
  );
}
export default BtnEdit;
