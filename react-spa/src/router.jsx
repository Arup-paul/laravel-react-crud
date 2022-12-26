import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./Components/DefaultLayout.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import UserForm from "./views/UserForm.jsx";

const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children:[
          {
              path:'/',
              element: <Navigate to="/users" />
          },
          {
              path:'/users',
              element: <Users />
          },
          {
              path:'/users/create',
              element: <UserForm key="userCreate" />
          },
          {
              path:'/users/:id',
              element: <UserForm key="userUpdate" />
          },
          {
              path:'/dashboard',
              element: <Dashboard />
          },
      ]

    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/signup',
                element: <Signup />
            },
        ]
    },

    {
        path:'*',
        element: <NotFound />
    },
]);

export default router;
