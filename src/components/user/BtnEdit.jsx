import Icon from "../common/Icon";

function BtnEdit({ customStyle, isEditing, onEdit, onCancel, onSubmit }) {
  let baseStyle =
    "btn align-items-center d-inline-flex justify-content-center ";
  if (customStyle) {
    baseStyle = baseStyle + customStyle;
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        className={baseStyle + " btn-outline-primary"}
        onClick={onEdit}
      >
        <Icon fileName={"edit"} size={20} />
        <span className="ms-1">編輯資料</span>
      </button>
    );
  }

  return (
    <div className="d-flex gap-2 justify-content-end">
      <button
        type="button"
        className={baseStyle + " btn-outline-primary"}
        onClick={onCancel}
      >
        取消
      </button>
      <button
        type="button"
        className={baseStyle + " btn-primary"}
        onClick={onSubmit}
      >
        儲存
      </button>
    </div>
  );
}

export default BtnEdit;
