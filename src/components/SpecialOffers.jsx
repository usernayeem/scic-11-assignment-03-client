import React, { useState, useEffect } from "react";
import axios from "axios";
import { RoomCard } from "./RoomCard";
import {
  FaTimes,
  FaPercent,
  FaFire,
  FaStar,
  FaCalendarAlt,
  FaSadTear,
} from "react-icons/fa";
import { Link } from "react-router";

export const SpecialOffers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountedRooms, setDiscountedRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if user has seen offers today
  const hasSeenOffersToday = () => {
    try {
      const lastSeen = sessionStorage.getItem("specialOffersLastSeen");
      const today = new Date().toDateString();
      return lastSeen === today;
    } catch (error) {
      return false;
    }
  };

  // Mark that user has seen offers today
  const markOffersAsSeen = () => {
    try {
      const today = new Date().toDateString();
      sessionStorage.setItem("specialOffersLastSeen", today);
    } catch (error) {}
  };

  // Fetch rooms with discounts
  const fetchDiscountedRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API}/rooms`);

      // Filter rooms that have discount prices
      const roomsWithDiscounts = response.data.filter(
        (room) => room.discountPrice && room.discountPrice < room.price
      );

      // Sort by discount percentage (highest first) and limit to 6
      const sortedRooms = roomsWithDiscounts
        .map((room) => ({
          ...room,
          discountPercentage: Math.round(
            ((room.price - room.discountPrice) / room.price) * 100
          ),
        }))
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 6);

      setDiscountedRooms(sortedRooms);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Show modal on component mount if user hasn't seen it today
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenOffersToday()) {
        fetchDiscountedRooms();
        setIsModalOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    markOffersAsSeen();
  };

  const reopenModal = () => {
    if (discountedRooms.length === 0) {
      fetchDiscountedRooms();
    }
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Floating Special Offers Button - Show when there are offers */}
      {!loading && discountedRooms.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={reopenModal}
            className="btn btn-circle btn-lg bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
            title="View Special Offers"
          >
            <FaPercent className="text-xl" />
          </button>
        </div>
      )}

      {/* Special Offers Modal */}
      {isModalOpen && discountedRooms.length > 0 && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-6xl bg-white dark:bg-gray-800 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <FaFire className="text-red-500 text-2xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  🔥 Special <span className="text-red-500">Offers</span>
                </h2>
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <FaStar className="text-red-500 text-2xl" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Don't miss out on these incredible deals! Limited time offers
                with amazing discounts on our premium rooms.
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col justify-center items-center py-12">
                <div className="loading loading-spinner loading-lg text-red-500 mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Loading special offers...
                </p>
              </div>
            )}

            {/* Special Offers Content */}
            {!loading && discountedRooms.length > 0 && (
              <>
                {/* Promotion Banner */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 mb-8 text-white text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <FaCalendarAlt className="text-xl" />
                    <span className="font-semibold text-lg">
                      Limited Time Offer!
                    </span>
                  </div>
                  <p className="text-red-100">
                    Book now and save up to{" "}
                    {Math.max(
                      ...discountedRooms.map((room) => room.discountPercentage)
                    )}
                    % on selected rooms
                  </p>
                </div>

                {/* Discounted Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {discountedRooms.map((room) => (
                    <div key={room._id} className="relative">
                      <RoomCard room={room} />
                      {/* Hot Deal Badge */}
                      {room.discountPercentage >= 30 && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                            🔥 HOT DEAL
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Ready to Book Your Perfect Stay?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    These offers won't last long. Book now to secure your
                    discount!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/rooms"
                      onClick={closeModal}
                      className="btn bg-red-500 hover:bg-red-600 border-red-500 text-white px-8"
                    >
                      Browse All Rooms
                    </Link>
                    <button
                      onClick={closeModal}
                      className="btn btn-outline border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 px-8"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* No Offers Message */}
            {!loading && discountedRooms.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4">
                  <FaSadTear className="text-6xl text-gray-400 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  No Special Offers Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Check back later for amazing deals and discounts on our
                  premium rooms.
                </p>
                <button
                  onClick={closeModal}
                  className="btn bg-red-500 hover:bg-red-600 border-red-500 text-white px-8"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
