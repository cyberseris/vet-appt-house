const VetTimeTable = () => {
    return (
        <>
            <div className="vetTimeTable primary-blue-5">
            <div className="timeTable-L d-flex flex-column justify-content-center align-items-center" >
                <div className="VeterinaryInfo d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex align-items-center mb-4 m-50-5"><img src="./src/assets/images/veterinary/vetlogo.png" alt="vetlogo.png" className="mr-8 vetlogo" />
                <span className="text-secondary roboto fz-32 lh-15 fw-400">萬祥</span><span className="text-primary-5 roboto fz-32 lh-15 fw-400">犬專科醫院</span></div>
                <span className="lh-15 fz-20 mb-4 roboto fw-400">高雄市新興區民生一路196號</span>
                <div className="mb-4 d-flex align-items-center">
                    <img src="../src/assets/images/veterinary/icon.png" className="phoneIcon mr-20" alt="phone icon" />
                    <h5 className="text-secondary roboto fz-32 lh-38-4 fw-600">07-227-4387</h5>
                </div>
                </div>
                <span className="lh-22 fz-14 mt-auto text-disabled roboto fw-400">高市建獸醫字第7號</span>
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
                    <tr className="fz-20 lh-15 h-60 text-center roboto borderBottom-1">
                    <td className="pt-4">09:00-12:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    </tr>
                    <tr className="fz-20 lh-15 h-60 text-center roboto borderBottom-1">
                    <td className="pt-4 ">14:00-17:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    <td className="pt-4">休</td>
                    </tr>
                    <tr className="fz-20 lh-15 h-60 text-center roboto">
                    <td className="pt-4">19:00-22:00</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">O</td>
                    <td className="pt-4">休</td>
                    <td className="pt-4">休</td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </>
    );
};

export default VetTimeTable;