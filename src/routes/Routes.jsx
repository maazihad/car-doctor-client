import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/Home/About/About";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Login/SignUp/SignUp";
import BookingService from "../Pages/BookingService/BookingService";
import Bookings from "../Pages/BookingService/Bookings";
import PrivateRoute from "../providers/PrivateRoute";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
         {
            path: '/',
            element: <Home />
         },
         {
            path: '/about',
            element: <About />
         },
         {
            path: '/login',
            element: <Login />
         },
         {
            path: '/signUp',
            element: <SignUp />
         },

         {
            path: '/book/:id',
            element: <BookingService></BookingService>,
            loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
         },
         {
            path: '/bookings',
            element: <PrivateRoute><Bookings></Bookings></PrivateRoute>

         }
      ]
   }
]);

export default router;