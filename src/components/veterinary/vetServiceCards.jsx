const services = [
    {
        title:"多物種專業診療",
        content: "專治狗、貓、鳥、兔，針對不同寵物需求，提供全面且細緻的專業醫療服務。",
        imgUrl:"../src/assets/images/veterinary/6.png"
    },
    {
        title:"多科專業診療",
        content: "涵蓋一般內科、外科與皮膚科等多項醫療服務，以專業診療方案照顧毛孩的全方位健康需求。",
        imgUrl:"../src/assets/images/veterinary/1.jpg"
    },    
    {
        title:"到府出診",
        content: "無需奔波，專業醫療團隊到府服務，讓毛孩在熟悉環境中獲得最佳照護。",
        imgUrl:"../src/assets/images/veterinary/9.jpg"
    },
    {
        title:"24 小時急診",
        content: "全年無休的急診服務，緊急時刻第一時間為毛孩提供救助與關懷。",
        imgUrl:"../src/assets/images/veterinary/10.jpg"
    }
]

const VetServiceCards = () => {
    return (
        <>
            <div className="row">
                {
                    services.map((service,i)=>{
                        return (
                            <div className="col-md-3" key={i}>
                                <div className="card primary-blue-5 border-0 h-100 w-306">
                                    <img src={service.imgUrl} className="card-img-top h-240 borderRadius-20" alt="#" />
                                    <div className="card-body p-24 d-flex flex-column">
                                        <span className="card-title roboto fz-20 lh-15 fw-600 mb-16">{service.title}</span>
                                        <span className="card-text roboto fz-16 lh-15 fw-400">{service.content}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default VetServiceCards;