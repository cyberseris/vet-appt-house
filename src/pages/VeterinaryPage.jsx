import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import axios from 'axios';
import PetsMarquee from "../components/veterinary/petsMarquee";
import VetServices from "../components/veterinary/vetServiceCards";
import VetTimeTable from "../components/veterinary/vetTimeTable";
import banner01 from "@/assets/images/veterinary/banner01.png";
import banner02 from "@/assets/images/veterinary/banner02.png";
import banner03 from "@/assets/images/veterinary/banner03.png";
import backgroundImage from "@/assets/images/veterinary/8.jpg";



  const images = [
    banner01,
    banner02,
    banner03
  ];
  
  const VeterinaryPage = () => {
    const [treatedAnimals,setTreatedAnimals] = useState([]);
    const [clinicsServices,setClinicsServices] = useState([]);
    const [mainImage,setMainImage] = useState([]);
    const [result, setResult] = useState({});



   /*  {
      "id": 4387,
      "city": "高雄市",
      "district": "新興區",
      "name": "萬祥犬專科醫院",
      "licenseNumber": "高市建獸醫字第7號",
      "services": [
        1,
        2,
        7,
        8,
        14
      ],
      "treatedAnimals": [
        1,
        2,
        4,
        5
      ],
      "businessHours": [
        [
          true,
          true,
          true,
          true,
          true,
          true,
          true
        ],
        [
          true,
          true,
          false,
          true,
          true,
          true,
          true
        ],
        [
          false,
          true,
          true,
          true,
          false,
          true,
          false
        ]
      ],
      "hasEmergency": true,
      "address": "高雄市新興區民生一路196號",
      "tel": "07-2274387",
      "CreateTime": "2025-02-19T09:00:00",
      "UpdateTime": "2025-02-19T09:00:00",
      "imageUrl": 12,
      "imagesUrl": [
        "https://images.unsplash.com/photo-1576671081741-c538eafccfff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw3NHx8dmV0ZXJpbmFyeSUyMGNsaW5pY3xlbnwwfHx8fDE3MzczNjEwNDl8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1606431424031-dbdedefc5bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHw0Mzh8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY2fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1663182106210-2d372c45ed23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwxNDR8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDUyfDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1674049405737-0df6ff767f8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwyMDV8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDU1fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "https://images.unsplash.com/photo-1682663947087-94157b8e4a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTkwMzN8MHwxfHNlYXJjaHwzODd8fHZldGVyaW5hcnklMjBjbGluaWN8ZW58MHx8fHwxNzM3MzYxMDY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
      ],
      "hasExoticPetTreat": true,
      "isEnabled": true,
      "isAllDay": true,
      "hasWalkInAppt": true,
      "licenseInfo": {
        "licenseType": "獸醫師",
        "licenseDate": "19761230",
        "ownName": "邱子鈴"
      },
      "HomeVisit": true,
      "hasCallBooking": false,
      "MCParking": true,
      "CarParking": false,
      "hasMultiDisTreat":true
    } */

    useEffect(()=>{
        const url = location.href
        const urlParams = {}

        if(url.includes("?")){
          url.split("?")[1]?.split("&").forEach((item)=>{
            const [key, value] = item.split("=");
            urlParams[key] = decodeURIComponent(value);
          })}
          
          const fetchData = async() => {
            try{
                const clinicsData =  await axios.get(`https://vet-appt-house-backend.onrender.com/vetClinics/${urlParams['id']}`)
                const treatedAnimalsData =  await axios.get(`https://vet-appt-house-backend.onrender.com/treatedAnimals`)
                const servicesData =  await axios.get(`https://vet-appt-house-backend.onrender.com/services`)
/*                 const mainImagesData =  await axios.get(`http://localhost:3000/mainImages`) */

                setTreatedAnimals(treatedAnimalsData.data)
                setClinicsServices(servicesData.data)
                
                /* setMainImage(mainImagesData.data[clinicsData.data.imageUrl].url) */
                setMainImage('https://raw.githubusercontent.com/cyberseris/2025_images/refs/heads/main/react_project/7.jpg')
                setResult(clinicsData.data)

            }catch(err){
              console.log("Error: ", err)
            }
          }
          fetchData();
      },[])

    const [index, setIndex] = useState(0);
  
    useEffect(()=>{
      const interval = setInterval(()=>{
        setIndex((preIndex)=>(preIndex+1) % images.length);
      },2000);
      return ()=>clearInterval(interval);
    },[])

    return result && result.name && (<>
      <section className="veterinaryHeader position-relative" style={{backgroundImage: `url(${mainImage?mainImage:backgroundImage})`, opacity:'0.8'}}>
        <div className="container">
          <div className="bubble position-absolute bottom-138">
            <img src="../src/assets/images/veterinary/bubble.png" className="bubbleJpg" alt="bubble.png" />
            <div className="bannerJpg">
                <motion.img 
                  key={index}
                  src={images[index]}
                  alt={`Slide ${index+1}`}
                  className="image"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1 }}
                />
            </div>
            <div className="vetBannerTitle d-flex flex-column z-3">
              <h5 className="Kosugi-Maru fz-24 lh-15 mb-2">{result.name}</h5>
              <span className="mb-3 h-116">
                <h3 className="Kosugi-Maru fz-48 lh-12">健康依靠</h3>
                <h3 className="Kosugi-Maru fz-48 lh-12">給毛孩最好的</h3>
              </span>
              <span className="mb-3 h-20">
                <h6 className="roboto fz-16 lh-12">專業關懷，您最信賴的選擇</h6>
              </span>
              <Link to="/" className="btn btn-m btn-primary w-135">
                  立即預約
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="vetService bg-secondary">
        <div className="container">
          <div className="section-title mb-5">
            <h3>診療服務</h3>
          </div>
          <VetServices result={result} treatedAnimals={treatedAnimals} clinicsServices={clinicsServices} />
        </div>
      </section>
      <section className="veterinaryTime">
        <div className="section03-bg">
          <img src="./src/assets/images/veterinary/section-03-bg.png" className="w-100 h-100" alt="section-03-bg.png" />
        </div>
        <div className="container">
          <div className="section-title mb-5">
            <h3>診療時間</h3>
          </div>
          <VetTimeTable result={result} />
        </div>
      </section>
      <section className="petsMarquee">
        <div className="container gap-4">
          <PetsMarquee />
        </div>
      </section>

    </>);
};

export default VeterinaryPage;