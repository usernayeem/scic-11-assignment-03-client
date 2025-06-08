import { createBrowserRouter } from "react-router";

import React from "react";
import { Root } from "./Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgetPass } from "../pages/ForgetPass";
import { NotFound } from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forget-password",
        element: <ForgetPass />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
