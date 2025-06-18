import React from "react";
import { Link } from "react-router-dom";
import { LuHotel } from "react-icons/lu";
import { IoHomeOutline, IoSearchOutline, IoCallOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 transition-colors duration-200 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you're looking for does not exist. Return to the homepage or browse our available rooms."
        />
        <meta
          name="keywords"
          content="404, Not Found, Hotel Nest, Page Not Found, Error"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="404 - Page Not Found" />
        <meta
          property="og:description"
          content="It seems the page you're looking for has checked out. Explore our amazing accommodations!"
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="https://www.hotel-nest.com/404" />
      </Helmet>
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-8xl md:text-9xl font-bold text-blue-600 opacity-20 select-none">
              404
            </h1>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400">
            It seems the page you're looking for has checked out. Don't worry,
            we have plenty of other amazing accommodations waiting for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white flex items-center gap-2 px-6"
          >
            <IoHomeOutline className="text-lg" />
            Back to Home
          </Link>

          <Link
            to="/rooms"
            className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center gap-2 px-6"
          >
            <IoSearchOutline className="text-lg" />
            Browse Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};
