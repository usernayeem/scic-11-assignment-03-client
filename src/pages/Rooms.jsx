import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import { FaBed, FaFilter } from "react-icons/fa";
import { RoomCard } from "../components/RoomCard";
import { Helmet } from "react-helmet";

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toast = useToast();

  // Fetch rooms from server
  const fetchRooms = async (filters = {}) => {
    try {
      setLoading(true);

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

      const queryString = queryParams.toString();
      const url = `${import.meta.env.VITE_API}/rooms/${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await axios.get(url);
      setRooms(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [toast]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchRooms({ minPrice, maxPrice });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    fetchRooms();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading rooms...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Helmet>
        <title>Rooms - Hotel Nest</title>
        <meta
          name="description"
          content="Explore our range of comfortable and luxurious rooms at Hotel Nest. Find the perfect stay for your next getaway."
        />
        <meta
          name="keywords"
          content="Hotel Rooms, Luxury Accommodation, Room Booking, Travel, Hotel Nest"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="Hotel Nest Rooms" />
        <meta
          property="og:description"
          content="Discover our collection of rooms designed for your comfort and relaxation."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="https://www.hotel-nest.com/rooms" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our <span className="text-blue-600">Rooms</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our collection of comfortable and luxurious rooms designed
            to make your stay unforgettable.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <FaFilter className="text-blue-600" />
                Filter by Price
              </h3>
              <button
                className="lg:hidden btn btn-sm btn-outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? "Hide" : "Show"} Filters
              </button>
            </div>

            <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
              <form
                onSubmit={handleFilterSubmit}
                className="flex flex-col lg:flex-row gap-4 lg:items-end"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="input input-bordered w-full text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    min="0"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="input input-bordered w-full text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    min="0"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  >
                    Apply Filter
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn btn-outline btn-secondary"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Rooms Grid */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaBed className="text-6xl mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No rooms found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
