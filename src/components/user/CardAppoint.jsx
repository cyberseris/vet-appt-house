import Icon from "../common/Icon";

function CardAppoint({ data }) {
  const _date = data.appointmentDateTime.split(" ")[0];
  const _time = data.appointmentDateTime.split(" ")[1];

  let styleDateBg = " bg-disabled text-center py-2 px-4 rounded-2 ";
  let styleAppointStatus = " appoint-status ";
  if (data.status == "已預約") {
    styleDateBg = " bg-reminder text-center py-2 px-4 rounded-2 ";
    styleAppointStatus += " active ";
  }

  return (
    <div className="card p-3 rounded-4 border-0" style={{ width: "21rem" }}>
      <div className="card-body p-0">
        {/* 上方 */}
        <div className="d-flex align-items-center">
          <div className={styleDateBg}>
            <p>Dec</p>
            <p className="fs-5 fw-bold">24</p>
          </div>
          <div className="ms-3">
            <p className="mb-2">{data.pets?.name}</p>
            <p>{data.vetClinics?.name}</p>
          </div>
          <div className="ms-auto mb-auto">
            <div className={styleAppointStatus}>{data.status}</div>
          </div>
        </div>
        {/* 上方 */}
        <hr className="my-4"></hr>
        {/* 下方 */}
        <div className="d-flex justify-content-between mb-4">
          <p className="d-flex align-items-center text-grey-scale-3">
            <span className="me-2">
              <Icon fileName={"date"} size={20} />
            </span>
            <span>{_date}</span>
          </p>
          <p className="d-flex align-items-center text-grey-scale-3">
            <span className="me-2">
              <Icon fileName={"clock"} size={20} />
            </span>
            <span>{_time}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-light rounded-pill px-4 py-3">
            查看詳情
          </button>
          <button className="btn btn-light rounded-pill px-4 py-3">
            取消預約
          </button>
        </div>
        {/* 下方 */}
      </div>
    </div>
  );
}

export default CardAppoint;
