import { createBrowserRouter } from "react-router-dom";

import Root from "./../root/Root";
import Register from "../pages/login-register/Register";
import Login from "../pages/login-register/Login";

import FileUpload from './../pages/login-register/multer';
import EditorList from "../pages/manageUser/EditorList";
import Home from "../pages/home/Home";
import AllSweep from "../pages/allPost/AllSweep";





const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'/add-post',
        element:<h2>im 2nd</h2>
      },
      {
        path:'/All-Sweep',
        element:<AllSweep/>
      },
      {
        path:'/multer',
        element:<FileUpload/>
      },
      {
        path:'/Editors',
        element:<EditorList/>
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