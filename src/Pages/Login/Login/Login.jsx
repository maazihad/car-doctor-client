import { Link } from "react-router-dom";
import login from "../../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";



const Login = () => {


   const { signIn } = useContext(AuthContext);

   const handleLogin = event => {
      event.preventDefault();

      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      const newUser = { email, password };
      console.log(newUser);

      signIn(email, password)
         .then(result => {
            const user = result.user;
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
      <>

         <div className="hero min-h-screen  ">
            <div className="hero-content flex-col justify-center lg:flex-row  w-full">
               <div className=" text-center lg:w-1/2 ">
                  <img src={login} className="py-6 h-[390px] mx-auto " alt="" />
               </div>
               <div className="card rounded-none border-2 border-gray-300 flex-shrink-0 lg:w-5/12  bg-base-100 min-h-[450px] ">
                  <div className="card-body ">
                     <h1 className="text-3xl font-bold text-center">Login</h1>
                     <form onSubmit={handleLogin}>

                        <div className="form-control">
                           <label className="label">
                              <span className="label-text">Email</span>
                           </label>
                           <input name="email" type="text" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                           <label className="label">
                              <span className="label-text">Password</span>
                           </label>
                           <input name="password" type="password" placeholder="password" className="input input-bordered" />
                           <label className="label">
                              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                           </label>
                        </div>

                        <div className="form-control mt-6">
                           <input className="btn btn-primary capitalize text-lg" type="submit" value="Login" />
                        </div>
                     </form>
                     <div>
                        <p className="text-amber-400">New to Car Doctor&apos;s, <Link className="text-amber-700" to="/signUp">Sign Up!</Link> </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;