import { createBrowserRouter } from "react-router";

import React from "react";
import { Root } from "./Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ForgetPass } from "../pages/ForgetPass";
import { NotFound } from "../pages/NotFound";
import { Rooms } from "../pages/Rooms";
import { RoomDetails } from "../pages/RoomDetails";
import { MyBookings } from "../pages/MyBookings";
import { Contact } from "../pages/Contact";

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/room-details/:id",
        element: <RoomDetails />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
