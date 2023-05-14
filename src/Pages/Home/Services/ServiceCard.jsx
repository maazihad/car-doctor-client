import { FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ServiceCard = ({ service }) => {

   const { _id, img, title, price } = service;

   return (
      <div className="card w-full bg-base-100 shadow-xl shadow-gray-700 ">
         <figure className="mt-11"><img className="h-[210px] object-cover" src={img} alt="Shoes" /></figure>
         <div className="card-body ml-3">
            <h2 className="card-title font-bold text-amber-700">{title}</h2>
            <p>Price : ${price}</p>
            <div className="card-actions justify-end">
               <Link to={`/book/${_id}`}>
                  <button className='btn btn-primary'>
                     book now
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default ServiceCard;