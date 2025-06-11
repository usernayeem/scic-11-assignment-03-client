import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import {
  FaStar,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaCoffee,
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
} from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  console.log(rooms);

  // Fetch rooms from server
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/rooms/`);

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [toast]);

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderAmenityIcon = (amenity) => {
    const iconClass = "text-blue-600 text-sm";
    switch (amenity) {
      case "wifi":
        return <FaWifi className={iconClass} title="Free WiFi" />;
      case "parking":
        return <FaParking className={iconClass} title="Free Parking" />;
      case "pool":
        return <FaSwimmingPool className={iconClass} title="Swimming Pool" />;
      case "ac":
        return <MdAcUnit className={iconClass} title="Air Conditioning" />;
      case "coffee":
        return <FaCoffee className={iconClass} title="Coffee Maker" />;
      default:
        return null;
    }
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

        {/* Rooms Grid */}
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Link
                to="/room-details"
                key={room._id}
                className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                {/* Room Image */}
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={
                      room.image ||
                      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    }
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-primary bg-blue-600 border-blue-600 text-white">
                      {room.type || "Standard"}
                    </span>
                  </div>
                </figure>

                <div className="card-body p-6">
                  {/* Room Name and Location */}
                  <div className="mb-3">
                    <h3 className="card-title text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {room.name || "Unnamed Room"}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                      <FaMapMarkerAlt className="mr-1" />
                      {room.location || "Location not specified"}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{room.capacity || 2} guests</span>
                    </div>
                    <div className="flex items-center">
                      <FaBed className="mr-1" />
                      <span>
                        {room.beds || 1} bed{(room.beds || 1) > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div>
                      <span>{room.size || 300} sq ft</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center space-x-2 mb-4">
                    {(room.amenities || ["wifi", "ac"])
                      .slice(0, 5)
                      .map((amenity, index) => (
                        <div key={index}>{renderAmenityIcon(amenity)}</div>
                      ))}
                    {(room.amenities || []).length > 5 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{room.amenities.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold text-gray-800 dark:text-white mr-1">
                        {getAverageRating(room.reviews)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        ({(room.reviews || []).length} review
                        {(room.reviews || []).length !== 1 ? "s" : ""})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ${room.price || 0}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                        /night
                      </span>
                    </div>
                    <button className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
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
