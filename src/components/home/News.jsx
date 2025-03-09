import { useEffect, useState } from "react";
import catPigCatPng from "@/assets/images/home/cat-pig-cat.png";
import { useMobile } from "@/context/MobileContext";
import api from "@/services/api";

const MobileNewsCard = ({ data, index }) => {
  return (
    <div className="news-card flex-column gap-4" data-aos="fade-right">
      <h6>{data.subtitle}</h6>
      <input
        className="d-none"
        type="checkbox"
        id={`news-read-more-${index}`}
      />
      <p className="fs-6">{data.content}</p>
      <label
        className="text-end text-tertiary user-select-none"
        htmlFor={`news-read-more-${index}`}
        role="button"
      >
        Read more
      </label>
    </div>
  );
};

const News = () => {
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mobileCurrentCard, setMobileCurrentCard] = useState(3);
  const isMobile = useMobile();

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    setMobileCurrentCard(3);
  }, [isMobile]);

  const getNews = async () => {
    const { data } = await api("/news");
    setNews(data);
    setSelected(data[0]);
  };

  return isMobile ? (
    <div className="news-container flex-column gap-1d5 align-items-center mt-4">
      {news.length > 0 ? (
        news
          .slice(0, mobileCurrentCard)
          .map((data, i) => (
            <MobileNewsCard
              data={data}
              key={`mobile-news-card-${i}`}
              index={i}
            />
          ))
      ) : (
        <div className="news-card flex-column gap-4" style={{ width: "400px" }}>
          <h6>目前沒有文章</h6>
        </div>
      )}
      {news.length > mobileCurrentCard && (
        <div
          className="view-more mt-4 fs-6 text-secondary user-select-none"
          role="button"
          onClick={() => setMobileCurrentCard((pre) => pre + 1)}
        >
          查看更多
        </div>
      )}
    </div>
  ) : (
    <div className="news-board d-flex mx-auto" data-aos="fade-right">
      <aside>
        {news.length > 0 ? (
          news.map((item) => (
            <div
              className={`fs-5 text-center ${
                selected?.id === item.id ? "selected" : ""
              }`}
              key={`news-${item.id}`}
              onClick={() => item.id !== undefined && setSelected(item)}
            >
              <p className="fs-5">{item.title}</p>
            </div>
          ))
        ) : (
          <div className="news-empty fs-5 text-center d-flex align-items-center">
            <p className="fs-5">目前沒有文章</p>
          </div>
        )}
      </aside>
      <div className="content bg-primary flex-column w-100">
        <h5>
          {selected?.subtitle || news.length > 0 ? "請點選文章" : "沒有文章"}
        </h5>
        <article className="fs-6">{selected?.content}</article>
      </div>
      <img className="decorate-img" src={catPigCatPng} alt="裝飾圖片" />
    </div>
  );
};

export default News;
