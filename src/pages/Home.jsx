import React from "react";
import { Banner } from "../components/Banner";
import { Map } from "../components/Map";
import { HotelAmenities } from "../components/HotelAmenities";
import { Contact } from "../components/Contact";
import { SpecialOffers } from "../components/SpecialOffers";
import { Helmet } from "react-helmet";

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Hotel Nest</title>
        <meta
          name="description"
          content="Welcome to Hotel Nest, your perfect getaway destination. Enjoy luxury accommodations, exceptional amenities, and special offers."
        />
        <meta
          name="keywords"
          content="Hotel, Accommodation, Luxury, Special Offers, Travel"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="Hotel Nest" />
        <meta
          property="og:description"
          content="Experience the best stay at Hotel Nest with exclusive amenities and offers."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="https://www.hotel-nest.com" />
      </Helmet>
      <SpecialOffers />
      <Banner />
      <Map />
      <HotelAmenities />
      <Contact />
    </div>
  );
};
