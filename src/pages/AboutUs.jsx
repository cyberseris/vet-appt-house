import React from "react";
import Icon from "../components/common/Icon";

const AboutUs = () => {
  return (
    <div className="hv100-nav-n-foot" style={{ padding: "4.5rem 2.5rem" }}>
      <h1
        className="text-center text-secondary"
        style={{ marginBottom: "4.5rem" }}
      >
        關於我們
      </h1>
      <div className="d-flex flex-wrap gap-5 justify-content-center ">
        <div style={{ width: "350px" }}>
          <h2 className="text-secondary mb-2">我們的使命</h2>
          <hr />
          <p className="fs-6">
            我們致力於提供優質的動物醫療服務，確保每一位寵物都能夠得到最好的照顧。我們的醫療團隊由經驗豐富的獸醫師和專業技術人員組成，旨在改善每一隻動物的生活質量。
          </p>
        </div>
        <div style={{ width: "350px" }}>
          <h2 className="text-secondary mb-2">我們的團隊</h2>
          <hr />
          <p className="fs-6">
            我們是一群熱愛動物的人，透過這個網站讓飼主能夠輕鬆找到合適的動物醫院。我們專注於提供便利的線上預約服務，並協助媒合優質獸醫，讓您的毛孩獲得最貼心的照顧。
          </p>
        </div>
        <div style={{ width: "350px" }}>
          <h2 className="text-secondary mb-2">聯繫我們</h2>
          <hr />
          <p className="fs-6">如需更多資訊，我們隨時為您解答任何疑問</p>
          <ul className="fs-6">
            <li>電話： 02 - 51456722</li>
            <li>電子郵件： vet.appt.house@gmail.com</li>
            <li>地址： 台北市玉里鄉長壽東路五段145號</li>
            <li className="text-secondary mt-2 d-flex align-items-center gap-3">
              <Icon fileName="line-icon" size={28} />
              <Icon fileName="fb-icon" size={30} />
              <Icon fileName="ig-icon" size={30} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
