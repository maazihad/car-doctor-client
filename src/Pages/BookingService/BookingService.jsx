import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import CheckoutBanner from '../Shared/CheckoutBanner/CheckoutBanner';
import Swal from 'sweetalert2';

const BookingService = () => {
   const service = useLoaderData();
   const { title, _id, price, img, date } = service;
   const { user } = useContext(AuthContext);
   console.log(user);
   const handleBooking = (event) => {
      event.preventDefault();

      const form = event.target;
      const name = form.name.value;
      const date = form.date.value;
      const email = user?.email;

      const booking = {
         customerName: name,
         date,
         email,
         img,
         service_id: _id,
         service_title: title,
         price: price,
      };
      console.log(booking);

      fetch('http://localhost:5000/bookings', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify(booking)
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.insertedId) {
               Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Successfully added',
                  showConfirmButton: false,
                  timer: 1000
               });
            }
         });

   };

   return (
      <>
         <CheckoutBanner></CheckoutBanner>
         <section className='relative'>
            <h3 className="text-2xl absolute -top-10   ml-2 text-white text-center">Book Service : {service.title}</h3>
            <div className="card-body bg-base-300" >
               <form onSubmit={handleBooking}>
                  <div className="grid md:grid-cols-2 gap-5">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Full Name</span>
                        </label>
                        <input name="name" type="text" className="input input-bordered" />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Date</span>
                        </label>
                        <input name="date" type="date" className="input input-bordered" />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Due amount</span>
                        </label>
                        <input defaultValue={price} name="price" type="text" className="input input-bordered" readOnly />
                     </div>
                  </div>

                  {/* <div className="form-control mt-6">
                     <textarea className="input input-bordered" name="message" id="" cols="30" rows="10" placeholder="Your messages"></textarea>
                  </div> */}

                  <div className="form-control mt-6">
                     <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                  </div>
               </form>
            </div>

         </section >

      </>
   );
};

export default BookingService;