import { createBrowserRouter } from "react-router-dom";

import { Private } from "./routes/Private";

import { Home } from "./pages/home/Home";
import { Admin } from "./pages/admin/Admin";
import { Login } from "./pages/login/Login";
import { Network } from "./pages/network/Network";
import { Error } from "./pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Network />
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export { router };
