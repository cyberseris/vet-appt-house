import { SERVICE_LIST } from "@/utils/constants";
const Services = () => {
  return (
    <div className="content d-flex justify-content-between mx-auto">
      {SERVICE_LIST.map(({ img, title, content }, i) => (
        <div
          className="service flex-column align-items-center gap-4"
          key={`site-service-${i}`}
          data-aos="fade-up"
          data-aos-delay={i*150}
        >
          <img src={img} alt={title + "Icon"} />
          <h5 className="text-secondary">{title}</h5>
          <p className="fs-6 text-primary">{content}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
