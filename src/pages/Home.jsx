import React from "react";
import { Banner } from "../components/Banner";
import { Map } from "../components/Map";
import { HotelAmenities } from "../components/HotelAmenities";
import { Contact } from "../components/Contact";
import { SpecialOffers } from "../components/SpecialOffers";

export const Home = () => {
  return (
    <div>
      <SpecialOffers />
      <Banner />
      <Map />
      <HotelAmenities />
      <Contact />
    </div>
  );
};