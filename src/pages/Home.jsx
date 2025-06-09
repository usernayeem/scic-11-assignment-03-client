import React from "react";
import { Banner } from "../components/Banner";
import { Map } from "../components/Map";
import { HotelAmenities } from "../components/HotelAmenities";

export const Home = () => {
  return (
    <div>
      <Banner />
      <Map />
      <HotelAmenities />
    </div>
  );
};
