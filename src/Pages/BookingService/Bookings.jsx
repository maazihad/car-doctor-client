import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
   const [bookings, setBookings] = useState([]);
   const { user } = useContext(AuthContext);
   const navigate = useNavigate();
   const url = `https://car-doctor-server-beryl-alpha.vercel.app/bookings?email=${user?.email}`;
   useEffect(() => {
      fetch(url, {
         method: 'GET',
         headers: {
            authorization: `bearer ${localStorage.getItem('car-doctor-access-token')}`
         }
      })
         .then(res => res.json())
         .then(data => {
            if (!data.error) {
               setBookings(data);
            }
            else {

               // you can then logout and navigate
               navigate('/');
            }
         });
   }, [url, navigate]);

   const handleDelete = (id) => {
      const isProceed = confirm(`Are you sure you want to delete`);
      if (isProceed) {
         fetch(`https://car-doctor-server-beryl-alpha.vercel.app/bookings/${id}`, {
            method: 'DELETE'
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               if (data.deletedCount > 0) {
                  alert("deleted Successful.");
                  const remainingData = bookings.filter(booking => booking._id !== id);
                  setBookings(remainingData);
               }
            });
      }
   };

   const handleBookingConfirm = (id) => {
      const isProceed = confirm(`Are you sure you want to confirm ?`);
      if (isProceed) {
         fetch(`https://car-doctor-server-beryl-alpha.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
               'content-type': 'application/json',
            },
            body: JSON.stringify({ status: 'confirm' })
         })
            .then(res => res.json())
            .then(data => {
               console.log(data);
               if (data.modifiedCount > 0) {
                  // something here
                  // আর এখানে filter করা হয়েছে কারণ সবগুলো আইডির মধ্যে যে আইডিকে চেঞ্জ করা হয়েছে সেটা বাদে
                  const remaining = bookings.filter(booking => booking._id !== id);
                  // এখানে একটা নির্দিষ্ট  আইডিকে আপডেট করব তাই find মেথড চালানো হয়েছে।
                  const updated = bookings.find(booking => booking._id === id);
                  updated.status = 'confirm';
                  const newBookings = [updated, ...remaining];
                  setBookings(newBookings);
               }
            });
      }
   };

   return (
      <section>
         <h2 className="text-center text-3xl mb-5  text-purple-700 font-bold">My Bookings : {bookings.length}</h2>

         <div className="overflow-x-auto w-full">
            <table className="table w-full">
               {/* head */}
               <thead>
                  <tr>
                     <th>
                        <label>
                           <input type="checkbox" className="checkbox" />
                        </label>
                     </th>
                     <th>Name&Pic</th>
                     <th>Title</th>
                     <th>Email</th>
                     <th>Price</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {
                     bookings.map(booking => <BookingsRow
                        key={booking._id}
                        booking={booking}
                        handleDelete={handleDelete}
                        handleBookingConfirm={handleBookingConfirm}
                     >

                     </BookingsRow>)
                  }
               </tbody>
            </table>
         </div>
      </section>
   );
};

export default Bookings;