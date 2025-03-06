import MarqueeEffect from "react-fast-marquee";
import pet1 from '@/assets/images/veterinary/pet-1.jpg';
import pet2 from '@/assets/images/veterinary/pet-2.jpg';
import pet3 from '@/assets/images/veterinary/pet-3.jpg';
import pet4 from '@/assets/images/veterinary/pet-4.jpg';
import pet5 from '@/assets/images/veterinary/pet-5.jpg';
import pet6 from '@/assets/images/veterinary/pet-6.jpg';
import pet7 from '@/assets/images/veterinary/pet-7.jpg';
import pet8 from '../../assets/images/veterinary/pet-8.jpg';
import pet9 from '../../assets/images/veterinary/pet-9.jpg';
import pet10 from '../../assets/images/veterinary/pet-10.jpg'
/* import pet8 from '../../assets/images/veterinary/pet-8.jpg';
import pet9 from '../../assets/images/veterinary/pet-9.jpg';
import pet10 from '../../assets/images/veterinary/pet-10.jpg';
import pet11 from '../../assets/images/veterinary/pet-11.jpg';
import pet12 from '../../assets/images/veterinary/pet-12.jpg';
import pet13 from '../../assets/images/veterinary/pet-13.jpg'; */

const images = [pet1,pet2,pet3,pet4,pet5,pet6,pet7,pet8,pet9,pet10]

const PetsMarquee = () => {
    return (
        <>
            <MarqueeEffect className="marquee d-flex flex-start">
                {images.map((image,i)=>{
                    return (
                        <span className="marqueeItem" key={i}><img src={image} className="marqueeImg rounded-circle  mr-16" alt={image.split('/')[4].split('.jpg')} /></span>
                    )
                })}      
            </MarqueeEffect>        
        </>
    )
}

export default PetsMarquee;