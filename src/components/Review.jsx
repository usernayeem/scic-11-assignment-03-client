import React, { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useToast } from "../contexts/ToastContext";
import Marquee from "react-fast-marquee";
import axios from "axios";

export const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    satisfactionRate: 0,
    returnGuests: 95,
  });
  const toast = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Use the new optimized endpoint
        const response = await axios.get(
          `${import.meta.env.VITE_API}/reviews/latest`
        );
        const { reviews, stats } = response.data;

        setReviews(reviews);
        setStats(stats);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [toast]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${
          index < rating
            ? "text-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderUserAvatar = (review) => {
    const placeholderImage = "https://i.ibb.co/MDfpbH6T/profile.webp";
    const userImage = review.photoURL || placeholderImage;

    return (
      <img
        src={userImage}
        alt={review.name || "Guest"}
        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 dark:border-blue-400"
        onError={(e) => {
          e.target.src = placeholderImage;
        }}
      />
    );
  };

  if (loading) {
    return (
      <div className="w-full py-16 transition-colors duration-200 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              What Our <span className="text-blue-600">Guests Say</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Read authentic reviews from our valued guests who have experienced
              the Hotel Nest difference firsthand.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading reviews...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 transition-colors duration-200 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            What Our <span className="text-blue-600">Guests Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Read authentic reviews from our valued guests who have experienced
            the Hotel Nest difference firsthand.
          </p>
        </div>

        {reviews.length > 0 ? (
          <div className="mb-8">
            <Marquee
              gradient={true}
              gradientColor={[255, 255, 255]}
              gradientWidth={100}
              speed={30}
              pauseOnHover={true}
              className="py-4 overflow-y-hidden"
            >
              {reviews.map((review, index) => (
                <div
                  key={`${review.roomId}-${index}`}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mx-4 w-80 h-80 flex flex-col transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <div className="mb-4 text-center">
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      {review.roomName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.roomLocation}
                    </p>
                  </div>

                  <div className="flex-1 relative mb-4">
                    <FaQuoteLeft className="absolute top-0 left-0 text-blue-200 dark:text-blue-800 text-lg" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-6 italic leading-relaxed line-clamp-4 text-center">
                      {review.comment || "Great stay!"}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                    {renderUserAvatar(review)}
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                        {review.name || "Anonymous Guest"}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaStar className="text-6xl mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to share your experience with Hotel Nest!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
