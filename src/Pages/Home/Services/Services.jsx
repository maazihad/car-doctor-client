import { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

   const [services, setServices] = useState([]);
   useEffect(() => {
      fetch('http://localhost:5000/services')
         .then(res => res.json())
         .then(data => setServices(data));
   }, []);

   return (
      <div className='grid lg:grid-cols-3 md-grid-cols-2 gap-6 mb-5'>
         {
            services.map(service => <ServiceCard
               key={service._id}
               service={service}
            >
            </ServiceCard>)
         }
      </div>
   );
};

export default Services;