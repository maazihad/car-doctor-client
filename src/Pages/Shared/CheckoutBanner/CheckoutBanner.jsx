
import checkoutBanner from "../../../assets/images/checkout/checkout.png";


const CheckoutBanner = () => {
   return (
      <section className="hero h-[300px] object-cover" style={{ backgroundImage: `url(${checkoutBanner})` }}>
         <div className="hero-overlay bg-opacity-60"></div>
         <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
               <h2 className="mb-5 text-4xl font-bold">Add New Service</h2>
            </div>
         </div>
      </section>
   );
};

export default CheckoutBanner;