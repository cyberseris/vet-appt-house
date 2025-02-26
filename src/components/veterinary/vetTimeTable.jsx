import PropTypes from 'prop-types';
// 假資料
const VetTimeTable = ({result}) => {
    return (
        <>
            <div className="vetTimeTable primary-blue-5">
            <div className="timeTable-L d-flex flex-column justify-content-center align-items-center" >
                <div className="VeterinaryInfo d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-center mb-4 m-50-5"><img src="./src/assets/images/veterinary/vetlogo.png" alt="vetlogo.png" className="mr-8 vetlogo" />
                <span className={`text-secondary roboto ${result.name.length>7? 'fz-28':'fz-32'} lh-15 fw-400`}>{result.name.includes("犬專科醫院")?result.name.slice(0,result.name.length-5):result.name.slice(0,result.name.length-4)}</span><span className={`text-primary-blue-4 roboto ${result.name.length>7? 'fz-28':'fz-32'} lh-15 fw-400`}>{result.name.includes("犬專科醫院")?result.name.slice(result.name.length-5,result.name.length):result.name.slice(result.name.length-4,result.name.length)}</span></div>
                <span className={`lh-15 ${result.name.length>16? 'fz-20':'fz-18'}  mb-4 roboto fw-400`}>{result.address}</span>
                <div className="mb-4 d-flex align-items-center">
                    <img src="../src/assets/images/veterinary/icon.png" className="phoneIcon mr-20" alt="phone icon" />
                    <h5 className="text-secondary roboto fz-32 lh-38-4 fw-600">{result.tel}</h5>
                </div>
                </div>
                <span className="lh-22 fz-14 mt-auto text-disabled roboto fw-400">{result.licenseNumber}</span>
            </div>
            <div className="timeTable-R pt-4">
                <table className="table" style={{"--bs-table-bg":"transparent"}}>
                <thead>
                    <tr className="fz-20 lh-15 roboto h-60 text-center borderBottom-1">
                    <td scope="col" className=""></td>
                    <td scope="col" className="pb-4">一</td>
                    <td scope="col" className="pb-4">二</td>
                    <td scope="col" className="pb-4">三</td>
                    <td scope="col" className="pb-4">四</td>
                    <td scope="col" className="pb-4">五</td>
                    <td scope="col" className="pb-4">六</td>
                    <td scope="col" className="pb-4">日</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        result["businessHours"].map((hour,i)=>
                             (
                                <tr key={i} className="fz-20 lh-15 h-60 text-center roboto borderBottom-1">
                                <td className="pt-3">{i===0?'09:00-12:00':i===1?'14:00-17:00':'19:00-22:00'}</td>
                                <td className="pt-3">{hour[0]?'O':'休'}</td>
                                <td className="pt-3">{hour[1]?'O':'休'}</td>
                                <td className="pt-3">{hour[2]?'O':'休'}</td>
                                <td className="pt-3">{hour[3]?'O':'休'}</td>
                                <td className="pt-3">{hour[4]?'O':'休'}</td>
                                <td className="pt-3">{hour[5]?'O':'休'}</td>
                                <td className="pt-3">{hour[6]?'O':'休'}</td>
                                </tr>))
                    }
                </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default VetTimeTable;