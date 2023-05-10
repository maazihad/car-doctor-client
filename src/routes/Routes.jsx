import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/Home/About/About";
import Login from "../Pages/Login/Login/Login";
import SignUp from "../Pages/Login/SignUp/SignUp";

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
      ]
   }
]);

export default router;