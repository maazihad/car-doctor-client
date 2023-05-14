import { useContext, useState } from 'react';
import login from "../../../assets/images/login/login.svg";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
   // const [error, setError] = useState('');
   const { createUser } = useContext(AuthContext);

   const handleSignUp = event => {
      event.preventDefault();

      const form = event.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const confirm = form.confirm.value;
      if (password !== confirm) {
         toast.error("Password doesn't matched.");
      }
      const newUser = { name, email, password, confirm };
      console.log(newUser);

      createUser(email, password)
         .then(result => {
            const user = result.user;
            console.log(user);
            if (user) {
               Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'User create successfully.',
                  showConfirmButton: false,
                  timer: 1000
               });
            }
         })
         .catch(error => console.error(error));
   };

   return (
      <div className="hero min-h-screen  ">
         <div className="hero-content justify-center flex-col lg:flex-row  w-full">
            <div className=" text-center lg:w-1/2 ">
               <img src={login} className="py-6 h-[390px] mx-auto " alt="" />
            </div>
            <div className="card rounded-none border-2 border-gray-300 flex-shrink-0 lg:w-5/12  bg-base-100 min-h-[450px] ">
               <div className="card-body ">
                  <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                  <form onSubmit={handleSignUp}>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" className="input input-bordered" />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" />
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Confirm Password</span>
                        </label>
                        <input name="confirm" type="password" placeholder="confirm password" className="input input-bordered" />
                     </div>

                     <div className="form-control mt-6">
                        <input className="btn btn-primary capitalize text-lg" type="submit" value="Sign Up" />
                     </div>
                  </form>
                  <div>
                     <p className="text-amber-400">Have an account ? please <Link className="text-amber-700" to="/login">Login</Link> </p>
                  </div>
                  <SocialLogin></SocialLogin>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignUp;