import { useEffect, useState } from "react";
import catPigCatPng from "@/assets/images/home/cat-pig-cat.png";
import { useMobile } from "@/context/MobileContext";

const MobileNewsCard = ({ data, index }) => {
  return (
    <div className="news-card flex-column gap-4">
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
    setMobileCurrentCard(3)
  }, [isMobile]);

  const getNews = async () => {
    const data = [
      {
        id: 1,
        title: "2025 人氣特輯",
        subtitle: "特寵熱潮：多樣化的寵物選擇",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: 2,
        title: "領養新法新上路",
        subtitle: "全新規範讓領養更透明",
        content: "全新的領養法規正式上路，讓寵物領養過程更加透明與規範...",
      },
      {
        id: 3,
        title: "讓新新領法上",
        subtitle: "全新規範領養更透明",
        content: "全新的領養法規正式上路，讓寵物領養過程更加透明與規範...",
      },
      {
        id: 4,
        title: "透明範讓路領法",
        subtitle: "全新養新養新上領規更",
        content: "全新的領養法規正式上路，讓寵物領養過程更加透明與規範...",
      },
      {
        id: 5,
        title: "法新養新領上路",
        subtitle: "全新規範讓領養更透明",
        content: "全新的領養法規正式上路，讓寵物領養過程更加透明與規範...",
      },
    ];

    setNews(data);
    setSelected(data[0]);
  };

  return isMobile ? (
    <div className="news-container flex-column gap-1d5 align-items-center mt-4">
      {news.slice(0, mobileCurrentCard).map((data, i) => (
        <MobileNewsCard data={data} key={`mobile-news-card-${i}`} index={i} />
      ))}
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
    <div className="news-board d-flex mx-auto">
      <aside>
        {news.map((item) => (
          <div
            className={`fs-5 text-center ${
              selected?.id === item.id ? "selected" : ""
            }`}
            key={`news-${item.id}`}
            onClick={() => item.id !== undefined && setSelected(item)}
          >
            <p className="fs-5">{item.title}</p>
          </div>
        ))}
      </aside>
      <div className="content bg-primary flex-column w-100">
        <h5>{selected?.subtitle || "請點選文章"}</h5>
        <article className="fs-6">{selected?.content}</article>
      </div>
      <img className="decorate-img" src={catPigCatPng} alt="裝飾圖片" />
    </div>
  );
};

export default News;
