import { useEffect, useReducer, useRef} from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Modal } from 'bootstrap';
import axios from 'axios';
import Navbar from "../components/common/NavBar";
import DatePicker from '@/components/common/DatePicker';
import api from "@/services/api";

export default function BookingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const appointmentModalRef = useRef(null);
    const modalInstanceRef = useRef(null);

    const initialState = {
      clinic:{
        clinicsData:[],
        serviceOptions:[],
        speciesOptions:[],
        vetClinicsId:-1
      },
      pet:{
        petOptions:[]
      },
      user:{
        usersId:-1,
        userName:'',
      },
      appointment:{
        time:[],
        submitData:{}
      },
      ui:{
        isOpen:false
      }      
    }

    function reducer(state, action){
      return {...state, ...Object.keys(action).reduce((acc, key) => {
        acc[key] = {...state[key], ...action[key]};
        return acc; 
      },{})}
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const timeLabels = ["上午","下午","晚上"]
    const departmentLabels = ["一般內科","一般外科","皮膚科","疫苗接種","結紮手術","牙科","影像診斷(X光、超音波、CT/MRI)","急診","行為診療","眼科","腫瘤科","泌尿科","復健科","寄生蟲防治","繁殖服務","特殊動物"]
    const speciesLabels = ["犬科","貓科","小型齧齒類(鼠)","中型齧齒類(兔)","飛禽科","爬蟲科","特寵專科"]

    useEffect(() => {
      modalInstanceRef.current = new Modal(appointmentModalRef.current, {
          backdrop: false
      });

    }, []);

    useEffect(() => {
        if (state.ui.isOpen) {
            modalInstanceRef.current?.show();
        } else {
            modalInstanceRef.current?.hide();
        }
    }, [state.ui.isOpen]);

    const handleCloseModal = () => {
        const modalInstance = Modal.getInstance(appointmentModalRef.current);
        modalInstance.hide();
        dispatch({
           ui: {
            ...state.ui,
            isOpen:false
           }
        })
    };
    
    useEffect(()=>{
      const isBookingPage = location.pathname.includes("/booking")||location.pathname.includes("/Booking");
      const urlParams = Object.fromEntries(searchParams);
      if (isNaN(urlParams.clinicId)) {
        navigate("/404");
        return;
      }
      console.log("data = location.state", location.state)
      
      console.log("!location.state", !location.state)
      const fetchData = async() => {
      if(isBookingPage){
        try{
            let data;
            if(!location.state){
              const fetchData =  await api.get(`/vetClinics/${urlParams['clinicId']}`)
              data = fetchData.data
            }else{
              data = location.state
            }
            
            const petData =  await api.get(`/pets?userId=1`)
            const businessHours = data.businessHours
            const day = new Date().getDay();

            dispatch({
              clinic: {
                clinicsData:data,
                vetClinicsId:Number(urlParams['clinicId']),
                serviceOptions:data.services.map(item=>item.id),
                speciesOptions:data.treatedAnimals.map(item=>item.id)
              },
              pet:{
                petOptions:petData.data.map(pet=>({id:pet.id,petName:pet.name}))
              },
              user: {
                usersId:1, //登入功能完成後修改
                userName:'六角' //登入功能完成後修改
              },
              appointment: {
                time:[businessHours[0][day === 0? 6 : day-1],businessHours[1][day === 0? 6 : day-1],businessHours[2][day === 0? 6 : day-1 ]]
              }              
            })
        }catch(err){
          console.log("Error: ", err)
        }
        }
      }

      fetchData();
    },[location.pathname, searchParams])

    useEffect(() => {
      if (state.user.usersId) {
        console.log("usersId 更新:", state.user.usersId);
      }
    }, [state.user.usersId]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      date:new Date(),
      species:state.clinic.speciesOptions[0],
      department:state.clinic.serviceOptions[0]
    }
  });

  const handleDateChange = (date) => {
    const day = date.getDay();
    const businessHours = state.clinic.clinicsData.businessHours

    dispatch({
       appointment: {
        time:[businessHours[0][day === 0? 6 : day-1],businessHours[1][day === 0? 6 : day-1],businessHours[2][day === 0? 6 : day-1]]
       }
    })
  }

  const onSubmit = (data) => {
    const time = new Date();
    
    dispatch({
      ui: {
        isOpen: true,
      },
      appointment: {
        submitData:{
          "species":data.species,
          "department":data.department,
          "status": "已預約",
          "appointmentDateTime": `${data.date.toLocaleString('sv').split(' ')[0]} ${data.time=='上午'?'09:00-12:00':data.time=='下午'?'14:00-17:00':'19:00-22:00'}`,
          "visitDateTime": "",
          "isCanceled": false,
          "createTime": new Date().toLocaleString('sv'),
          "updateTime": "",
          "vetClinicsId": state.clinic.vetClinicsId,
          "usersId": state.user.usersId,
          "petsId": Number(data.petsId)
        }
      }
  })

  };

  const confirmSubmit = async() => {
    dispatch({
      ui:{
        isOpen:false
      }  
    })
    await axios.post('http://localhost:3000/appointments', state.appointment.submitData)
    .then(res=>{
      if(res.status===201){
        alert("預約成功")
      }
    }).catch(err=>{
      console.log("Error: ", err)
    })
  }

  return (
    <>
      <Navbar />
      <div className="booking d-flex justify-content-center align-items-center hv100-with-nav p-4">
        <div className="block bg-primary p-4">
          <h3 className="text-center mb-3">填寫預約資料</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field flex-column gap-2 mb-3">
              <h5 className="mb-3">飼主資訊</h5>
              {/* 填寫姓名 */}
              <label className="form-label" htmlFor="booking-page-name">
                飼主姓名
              </label>
              <input
                type="text"
                id="booking-page-name"
                className={`input-text-primary mb-2`}
                value={state.user.userName}
              />
              {/* 填寫寵物物種 */}
              <label className="form-label" htmlFor="booking-page-email">
                  預約物種
              </label>
              <select {...register("species", { required: true })} className="form-select mb-2">
                <option value=''>請選擇物種</option>
                {state.clinic.speciesOptions.map(id=>(<option key={id} value={id}>{speciesLabels[id-1]}</option>)
                )}
              </select>
              <label className="form-label" htmlFor="booking-page-email">
                預約科別
              </label>
              <select {...register("department", { required: true })} className="form-select mb-2">
                <option value=''>請選擇科別</option>
                {
                  state.clinic.serviceOptions.map(id=>(<option key={id} value={id}>{departmentLabels[id-1]}</option>))
                }
              </select>
              <label className="form-label" htmlFor="booking-page-date">
                預約日期
              </label>
              <Controller
                name="date"
                control={control}
                rules={{required:"請選擇日期"}}
                render={({field})=>(
                  <DatePicker 
                    {...field}
                    selected={field.value}
                    onChange={(date)=> {
                      field.onChange(date)
                      handleDateChange(date)
                    }}
                    className="form-control"
                    placeholderText="請選擇日期"
                  />
                )}
              />
              <label className="form-label" htmlFor="booking-page-time">
                預約時間
              </label>
              <select {...register("time", { required: true })} className="form-select mb-2">
                <option value=''>請選擇時間</option>
                {state.appointment.time.map((isAvailable, index) =>
                  isAvailable && <option key={index} value={timeLabels[index]}>{timeLabels[index]}</option>
                )}
              </select> 
              <hr className="mb-3" />
              <h5 className="mb-3">寵物資訊</h5>
              {/* 填寫寵物名稱 */}
              <label className="form-label" htmlFor="booking-page-petname">
                寵物名稱 
              </label>
              <select {...register("petsId", {required:true})} className="form-select mb-2">
                <option value=''>請選擇寵物</option>
                  {
                    state.pet.petOptions.map( (pet) =>(<option key={pet.id} value={pet.id}>{pet.petName}</option>))
                  }
              </select>                     
            </div>
            <div className="d-flex gap-1 mt-5">
              <button type="submit" className="btn-m btn-quaternary mx-auto w-50">
              預約
              </button>
              <button type="reset" className="btn-m btn-quaternary  w-50">
              清除
              </button>
            </div>
          </form>          
        </div>
        
        <div className="modal" ref={appointmentModalRef} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-light bg-danger">
                <h5 className="modal-title">預約資訊</h5>
                <button type="button" onClick={handleCloseModal} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body fz-20">
                <div className="mb-3">
                  <label className="form-label " htmlFor="owner-name">
                    飼主姓名
                  </label>
                  <span id="owner-name" className="form-control-plaintext">{state.user.userName}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="species">
                    預約物種
                  </label>
                  <span id="species" className="form-control-plaintext">{state.appointment.submitData.species?speciesLabels[state.appointment.submitData.species-1]:'未選擇'}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="category">
                    預約科別
                  </label>
                  <span id="category" className="form-control-plaintext">{state.appointment.submitData.department?departmentLabels[state.appointment.submitData.department-1]:'未選擇'}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="appointment-date">
                    預約時間
                  </label>
                  <span id="appointment-date" className="form-control-plaintext">{state.appointment.submitData?state.appointment.submitData.appointmentDateTime:'未選擇'}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="pet-name">
                    寵物名稱
                  </label>
                  <span id="pet-name" className="form-control-plaintext">{state.appointment.submitData.petsId?state.pet.petOptions.map(pet=>{
                    if(pet.id==state.appointment.submitData.petsId){
                      return pet.petName
                    }
                  }):'未選擇'}</span>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={handleCloseModal} className="btn btn-outline-danger" data-bs-dismiss="modal">返回修改</button>
                <button type="button" onClick={confirmSubmit} className="btn btn-outline-quaternary">確認送出</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
