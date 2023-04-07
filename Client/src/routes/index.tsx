//= Router
import { createBrowserRouter } from "react-router-dom";
//= Routes
import Home from '../pages/Home';
import Profile from "../pages/Profile";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
//= Router Guard
import { shouldBeAuthenticated, shouldNotBeAuthenticated } from './routesGuard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: shouldBeAuthenticated
  },
  {
    path: "/profile",
    element: <Profile />,
    loader: shouldBeAuthenticated
  },
  {
    path: "/login",
    element: <Login />,
    loader: shouldNotBeAuthenticated
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: shouldNotBeAuthenticated
  },
]);

export default router