import FeaturedClinics from "../components/home/FeaturedClinics";
import Header from "../components/home/Header";
import News from "../components/home/News";
import SearchForm from "../components/home/SearchForm";
import Services from "../components/home/Services";

const sections = [
  { title: "我們的服務", id: "site-services", Component: Services },
  { title: "最新消息", id: "news", Component: News },
  {
    title: "精選特寵院所",
    id: "featured-clinic",
    Component: FeaturedClinics,
  },
];

const Sections = () => (
  <div className="background-pattern">
    {sections.map(({ title, id, Component }) => (
      <section key={id} className={id} id={id}>
        <div className="section-title">
          <h3>{title}</h3>
        </div>
        <Component />
      </section>
    ))}
  </div>
);

const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <section className="find-vet" id="find-vet">
        <div className="section-title">
          <h3>找醫院</h3>
        </div>
        <SearchForm />
      </section>
      <Sections />
    </div>
  );
};

export default HomePage;