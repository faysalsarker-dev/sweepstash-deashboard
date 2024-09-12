import { createBrowserRouter } from "react-router-dom";

import Root from "./../root/Root";
import Register from "../pages/login-register/Register";
import Login from "../pages/login-register/Login";

import FileUpload from './../pages/login-register/multer';




const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index:true,
        element:<h2>im defult</h2>
      },
      {
        path:'/add-post',
        element:<h2>im 2nd</h2>
      },
      {
        path:'/control',
        element:<h2>im 3nd</h2>
      },
      {
        path:'/multer',
        element:<FileUpload/>
      },
    ]
  
    
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
]);

export default router;