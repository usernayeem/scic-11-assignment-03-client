import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
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
  FaRulerCombined,
  FaCalendarAlt,
  FaArrowLeft,
  FaQuoteLeft,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdAcUnit } from "react-icons/md";
import axios from "axios";
import { Helmet } from "react-helmet";

export const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Get the current price (discount price if available, otherwise regular price)
  const getCurrentPrice = () => {
    if (room?.discountPrice && room.discountPrice < room.price) {
      return room.discountPrice;
    }
    return room?.price || 0;
  };

  // Calculate total price including additional guest fees
  const getTotalPrice = () => {
    const basePrice = getCurrentPrice();
    const additionalGuests = Math.max(0, guests - 1); // First guest is free
    const additionalGuestFee = basePrice * 0.25 * additionalGuests; // 25% per additional guest
    return basePrice + additionalGuestFee;
  };

  // Fetch room details
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API}/rooms/${id}`
        );
        setRoom(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Room not found");
        } else {
          toast.error("Failed to fetch room details");
        }
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRoomDetails();
    }
  }, [id, toast, navigate]);

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Check if a date is available
  const isDateAvailable = (date) => {
    if (!room || !room.bookedDates) return true;
    return !room.bookedDates.includes(date);
  };

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const renderAmenityIcon = (amenity) => {
    const iconClass = "text-blue-600 text-lg";
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

  const handleBooking = async () => {
    try {
      setBookingLoading(true);

      const totalPrice = getTotalPrice();
      const bookingData = {
        roomImage: room.image,
        roomId: room._id,
        roomName: room.name,
        price: totalPrice,
        bookingDate,
        guests,
        userEmail: user.email,
        userName: user.displayName || user.email,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };

      // Create booking
      const bookingResponse = await axios.post(
        `${import.meta.env.VITE_API}/bookings`,
        bookingData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Update room availability
      await axios.patch(`${import.meta.env.VITE_API}/rooms/${id}/book-date`, {
        date: bookingDate,
      });

      // Update local room state
      setRoom((prevRoom) => ({
        ...prevRoom,
        bookedDates: [...(prevRoom.bookedDates || []), bookingDate],
      }));

      toast.success("Room booked successfully!");
      setIsBookingModalOpen(false);
      setBookingDate("");
      navigate("/my-bookings");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to book room. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const openBookingModal = () => {
    if (!user) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingDate("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading room details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Helmet>
        <title>Room Details - Hotel Nest</title>
        <meta
          name="description"
          content="View detailed information about the room at Hotel Nest, including amenities, pricing, and guest reviews."
        />
        <meta
          name="keywords"
          content="Room Details, Hotel Nest, Accommodation, Room Booking, Travel"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="Room Details - Hotel Nest" />
        <meta
          property="og:description"
          content="Discover all the features of your selected room, including pricing and availability."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta
          property="og:url"
          content={`https://www.hotel-nest.com/rooms/${id}`}
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/rooms")}
          className="btn btn-ghost mb-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FaArrowLeft className="mr-2" />
          Back to Rooms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Image */}
            <div className="mb-8">
              <img
                src={
                  room.image || "https://i.ibb.co/GQzR5BLS/image-not-found.webp"
                }
                alt={room.name}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://i.ibb.co/GQzR5BLS/image-not-found.webp";
                }}
              />
            </div>

            {/* Room Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {room.name}
                  </h1>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                    <FaMapMarkerAlt className="mr-2" />
                    {room.location}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {renderStars(Math.round(getAverageRating(room.reviews)))}
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {getAverageRating(room.reviews)} (
                        {room.reviews?.length || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="badge badge-primary bg-blue-600 border-blue-600 text-white text-lg p-3">
                    {room.type || "Standard"}
                  </span>
                </div>
              </div>

              {/* Room Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaUsers className="text-blue-600 text-xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Guests
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {room.capacity || 2}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaBed className="text-blue-600 text-xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Beds
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {room.beds || 1}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FaRulerCombined className="text-blue-600 text-xl mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Size
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {room.size || 300} sq ft
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-blue-600 text-xl mx-auto mb-2 block">
                    $
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Per Day
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    ${getCurrentPrice()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {room.description ||
                    "Experience comfort and luxury in this beautifully designed room. Perfect for travelers seeking a memorable stay with modern amenities and exceptional service."}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(room.amenities || ["wifi", "ac", "parking"]).map(
                    (amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        {renderAmenityIcon(amenity)}
                        <span className="ml-3 text-gray-700 dark:text-gray-300 capitalize">
                          {amenity === "wifi"
                            ? "Free WiFi"
                            : amenity === "ac"
                            ? "Air Conditioning"
                            : amenity === "pool"
                            ? "Swimming Pool"
                            : amenity}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Reviews ({room.reviews?.length || 0})
              </h3>

              {room.reviews && room.reviews.length > 0 ? (
                <div className="space-y-6">
                  {room.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-600 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <img
                            src={
                              review.photoURL ||
                              "https://i.ibb.co/MDfpbH6T/profile.webp"
                            }
                            alt={review.name || "Guest"}
                            className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 dark:border-blue-400"
                            onError={(e) => {
                              e.target.src =
                                "https://i.ibb.co/MDfpbH6T/profile.webp";
                            }}
                          />
                          <div className="ml-3">
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {review.name || "Anonymous Guest"}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {review.date || "Recent stay"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className="relative">
                        <FaQuoteLeft className="absolute top-0 left-0 text-blue-200 dark:text-blue-800 text-xl" />
                        <p className="text-gray-600 dark:text-gray-400 pl-8 italic">
                          {review.comment || "Great stay!"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <FaStar className="text-4xl mx-auto mb-3" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    No reviews yet
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Book this room to share your experience!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 sticky top-8">
              {/* Clean Pricing Display - Inspired by RoomCard */}
              <div className="text-center mb-6">
                {room.discountPrice && room.discountPrice < room.price ? (
                  <div>
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-blue-600">
                        ${room.discountPrice}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ${room.price}
                      </span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      per night
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      ${room.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                      /night
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={getMinDate()}
                      className="input input-bordered w-full text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Date availability indicator */}
                  {bookingDate && (
                    <div className="mt-2">
                      {isDateAvailable(bookingDate) ? (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <FaCheck className="mr-2" />
                          <span>Date is available!</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                          <FaExclamationTriangle className="mr-2" />
                          <span>Date is not available</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Guests (Max 3)
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="select select-bordered w-full text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  >
                    {Array.from({ length: 3 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i + 1 > 1 ? "s" : ""}
                        {i === 0
                          ? ""
                          : ` (+$${Math.round(getCurrentPrice() * 0.25 * i)})`}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    First guest is free. Additional guests: +25% each
                  </p>
                </div>
              </div>

              {bookingDate && isDateAvailable(bookingDate) && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Room price
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      ${getCurrentPrice()}
                    </span>
                  </div>
                  {guests > 1 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Additional guests ({guests - 1})
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        +${Math.round(getCurrentPrice() * 0.25 * (guests - 1))}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {new Date(bookingDate).toLocaleDateString()} • {guests}{" "}
                    guest{guests > 1 ? "s" : ""}
                  </div>
                  <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Total
                      </span>
                      <span className="font-bold text-blue-600 text-lg">
                        ${Math.round(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={openBookingModal}
                disabled={!bookingDate || !isDateAvailable(bookingDate)}
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 border-blue-600 text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaCalendarAlt className="mr-2" />
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box max-w-md bg-white dark:bg-gray-800">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {room.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {room.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {room.type || "Standard"} Room
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {new Date(bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Guests
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {guests}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Room price
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        ${getCurrentPrice()}
                      </span>
                    </div>
                    {guests > 1 && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Additional guests ({guests - 1})
                        </span>
                        <span className="text-gray-800 dark:text-white">
                          +$
                          {Math.round(getCurrentPrice() * 0.25 * (guests - 1))}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-300 dark:border-gray-600 pt-2">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      Total Amount
                    </span>
                    <span className="font-bold text-blue-600 text-xl">
                      ${Math.round(getTotalPrice())}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    For {new Date(bookingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="modal-action">
                <button
                  onClick={closeBookingModal}
                  className="btn btn-ghost"
                  disabled={bookingLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
