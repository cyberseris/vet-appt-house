import vetLogo from "@/assets/images/veterinary/vetlogo.png"
import phoneIcon from "@/assets/images/veterinary/icon.png"

const formatVetName = (name) => {
  const suffixes = ["犬專科醫院", "動物醫院", "獸醫院"];
  const suffix = suffixes.find((s) => name.includes(s)) || "";
  return {
    base: name.replace(suffix, ""),
    suffix,
  };
};

const VetTimeTable = ({ clinicData }) => {
  const { base, suffix } = formatVetName(clinicData.name);
  const isLongName = clinicData.name.length > 7;
  const addressSize = clinicData.name.length > 16 ? "fz-20" : "fz-18";
  const timeSlots = [
    ["09:00", "12:00"],
    ["14:00", "17:00"],
    ["19:00", "22:00"],
  ];
  const weekdays = ["一", "二", "三", "四", "五", "六", "日"];

  return (
    <section className="veterinaryTime">
      <div className="container">
        <div className="section-title">
          <h3>診療時間</h3>
        </div>
        <div className="vetTimeTable d-flex">
          <div className="timeTable-L d-flex flex-column justify-content-center align-items-center">
            <div className="VeterinaryInfo d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex align-items-center mb-4 m-50-5">
                <img
                  src={vetLogo}
                  alt="vetlogo"
                  className="mr-8 vetlogo"
                />
                <span
                  className={`d-flex flex-wrap  roboto ${
                    isLongName ? "fz-28" : "fz-32"
                  } lh-15 fw-400`}
                >
                  <span className={`text-secondary`}>{base}</span>
                  <span className={`text-primary-blue-4`}>{suffix}</span>
                </span>
              </div>
              <span className={`lh-15 ${addressSize} mb-4 roboto fw-400`}>
                {clinicData.address}
              </span>
              <div className="mb-4 d-flex align-items-center">
                <img
                  src={phoneIcon}
                  className="phoneIcon mr-20"
                  alt="phone icon"
                />
                <h5 className="text-secondary roboto fz-32 lh-38-4 fw-600">
                  {clinicData.tel}
                </h5>
              </div>
            </div>
            <span className="lh-22 fz-14 mt-auto text-disabled roboto fw-400">
              {clinicData.licenseNumber}
            </span>
          </div>
          <div className="timeTable-R pt-4">
            <table className="table" style={{ "--bs-table-bg": "transparent" }}>
              <thead className="table-mobile">
                <tr className="row fz-20 lh-15 roboto text-center borderBottom-1">
                  <td className="col-3 w-76"></td>
                  {timeSlots.map((slot, i) => (
                    <td key={i} className="col-3 pb-4 w-76">
                      {slot[0]}
                      <br />｜<br />
                      {slot[1]}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="table-mobile">
                {weekdays.map((day, i) => (
                  <tr
                    key={i}
                    className="row fz-20 lh-15 h-60 text-center roboto borderBottom-1"
                  >
                    <td className="col-3 pt-3 w-76">{day}</td>
                    {clinicData.businessHours.map((hours, j) => (
                      <td key={j} className="col-3 pt-3 w-76">
                        {hours[i] ? "O" : "休"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <thead className="table-desktop">
                <tr className="fz-20 lh-15 roboto h-60 text-center borderBottom-1">
                  <td></td>
                  {weekdays.map((day, i) => (
                    <td key={i} className="pb-4">
                      {day}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className="table-desktop">
                {clinicData.businessHours.map((hours, i) => (
                  <tr
                    key={i}
                    className="fz-20 lh-15 h-60 text-center roboto borderBottom-1"
                  >
                    <td className="pt-3">{timeSlots[i].join` - `}</td>
                    {hours.map((open, j) => (
                      <td key={j} className="pt-3">
                        {open ? "O" : "休"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VetTimeTable;
