import React from 'react';
import person from "../../../assets/images/about_us/person.jpg";
import parts from "../../../assets/images/about_us/parts.jpg";

const About = () => {
   return (
      <section className="hero min-h-screen">
         <div className="hero-content flex-col lg:flex-row">
            <div className='relative lg:w-1/2'>
               <img src={person} className="w-4/5 rounded-lg h-[470px] object-cover" />
               <img src={parts} className="absolute border-8 h-[332px] object-cover border-white right-5 w-1/2 top-1/2  rounded-lg " />
            </div>
            <div className='lg:w-1/2 pl-5'>
               <h3 className='text-red-700 font-bold text-xl '>About Us</h3>
               <h1 className="text-5xl font-bold mt-3 space-y-3">We are qualified & of experience in this field</h1>
               <p className="py-6 ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
               <p className="py-6 ">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
               <button className="btn btn-primary capitalize border-none bg-amber-500 hover:bg-amber-700">Get More Info</button>
            </div>
         </div>
      </section>
   );
};

export default About;