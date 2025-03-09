import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PetsMarquee from "../components/veterinary/PetsMarquee";
import VetServices from "../components/veterinary/VetServiceCards";
import VetTimeTable from "../components/veterinary/VetTimeTable";
import api from "../services/api";
import VetHeader from "../components/veterinary/VetHeader";

const VeterinaryPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [clinicData, setClinicData] = useState(location.state || []);

  useEffect(() => {
    if (isNaN(params.id)) {
      navigate("/404");
      return;
    }
    if (!location.state) {
      getClinicData();
    }
  }, []);

  const getClinicData = async () => {
    try {
      const { data } = await api(`/vetClinics/${params.id}`);
      setClinicData(data);
    } catch (err) {
      err.response?.data?.error === "Not found"
        ? navigate("/404")
        : console.error("Error: ", err);
    }
  };

  return (
    <div className="vet-page hv100-nav-n-foot">
      {clinicData.name ? (
        <>
          <VetHeader clinicData={clinicData} />
          <VetServices clinicData={clinicData} />
          <VetTimeTable clinicData={clinicData} />
          <PetsMarquee />
        </>
      ) : (
        <h1 className="mt-4 text-center">獸醫院資料異常，請聯絡站務人員</h1>
      )}
    </div>
  );
};

export default VeterinaryPage;
