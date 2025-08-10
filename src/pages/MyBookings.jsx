import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import moment from "moment";
import {
  FaTrash,
  FaEdit,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaBed,
  FaExclamationTriangle,
  FaCheck,
  FaTimes,
  FaEye,
  FaClock,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

export const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [updateDateModalOpen, setUpdateDateModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Check if booking can be cancelled (at least 1 day before booking date)
  const canCancelBooking = (bookingDate) => {
    const booking = moment(bookingDate);
    const today = moment();
    const daysDifference = booking.diff(today, "days");

    // Can cancel if booking date is at least 1 day in the future
    return daysDifference >= 1;
  };

  // Get cancellation deadline for a booking
  const getCancellationDeadline = (bookingDate) => {
    const booking = moment(bookingDate);
    const deadline = booking.subtract(1, "day");
    return deadline.format("MMMM Do, YYYY");
  };

  // Get days remaining for cancellation
  const getDaysUntilCancellationDeadline = (bookingDate) => {
    const booking = moment(bookingDate);
    const deadline = booking.clone().subtract(1, "day");
    const today = moment();
    const daysRemaining = deadline.diff(today, "days");

    return Math.max(0, daysRemaining);
  };

  // Fetch user bookings and check for existing reviews
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API}/bookings/${user.email}`
        );

        // For each booking, check if user has already reviewed this room
        const bookingsWithReviewStatus = await Promise.all(
          response.data.map(async (booking) => {
            try {
              const roomResponse = await axios.get(
                `${import.meta.env.VITE_API}/rooms/${booking.roomId}`
              );
              const room = roomResponse.data;
              const userReview = room.reviews?.find(
                (review) => review.userEmail === user.email
              );

              return {
                ...booking,
                hasReviewed: !!userReview,
                userReview: userReview || null,
              };
            } catch (error) {
              return { ...booking, hasReviewed: false, userReview: null };
            }
          })
        );

        setBookings(bookingsWithReviewStatus);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, navigate, toast]);

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Handle cancel booking
  const handleCancelBooking = async () => {
    try {
      setCancelLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_API}/bookings/${selectedBooking._id}`,
        {
          data: { userEmail: user.email },
          headers: { "Content-Type": "application/json" },
        }
      );

      // Update local state
      setBookings(
        bookings.filter((booking) => booking._id !== selectedBooking._id)
      );

      toast.success(
        "Booking cancelled successfully! The room is now available again."
      );
      setCancelModalOpen(false);
      setSelectedBooking(null);
    } catch (error) {
      toast.error("Failed to cancel booking");
    } finally {
      setCancelLoading(false);
    }
  };

  // Handle update date
  const handleUpdateDate = async () => {
    try {
      setUpdateLoading(true);

      // First remove the old date from room's booked dates
      await axios.patch(
        `${import.meta.env.VITE_API}/rooms/${
          selectedBooking.roomId
        }/remove-date`,
        {
          date: selectedBooking.bookingDate,
        }
      );

      // Then add the new date to room's booked dates
      await axios.patch(
        `${import.meta.env.VITE_API}/rooms/${selectedBooking.roomId}/book-date`,
        {
          date: newDate,
        }
      );

      // Update the booking in database
      await axios.patch(
        `${import.meta.env.VITE_API}/bookings/${selectedBooking._id}`,
        {
          bookingDate: newDate,
          updatedAt: new Date().toISOString(),
        }
      );

      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, bookingDate: newDate }
            : booking
        )
      );

      toast.success("Booking date updated successfully!");
      setUpdateDateModalOpen(false);
      setSelectedBooking(null);
      setNewDate("");
    } catch (error) {
      toast.error("Failed to update booking date");
    } finally {
      setUpdateLoading(false);
    }
  };

  // Handle submit review (both new and edit)
  const handleSubmitReview = async () => {
    try {
      setReviewLoading(true);

      const reviewData = {
        name: user.displayName || user.email,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toLocaleDateString(),
        userEmail: user.email,
        photoURL: user.photoURL || null,
      };

      if (isEditingReview) {
        // Update existing review
        await axios.patch(
          `${import.meta.env.VITE_API}/rooms/${
            selectedBooking.roomId
          }/review/update`,
          {
            userEmail: user.email,
            review: reviewData,
          }
        );
        toast.success("Review updated successfully!");
      } else {
        // Add new review
        await axios.patch(
          `${import.meta.env.VITE_API}/rooms/${selectedBooking.roomId}/review`,
          {
            review: reviewData,
          }
        );
        toast.success("Review submitted successfully!");
      }

      // Update local booking state
      setBookings(
        bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, hasReviewed: true, userReview: reviewData }
            : booking
        )
      );

      setReviewModalOpen(false);
      setSelectedBooking(null);
      setReviewRating(5);
      setReviewComment("");
      setIsEditingReview(false);
      setExistingReview(null);
    } catch (error) {
      toast.error(
        isEditingReview ? "Failed to update review" : "Failed to submit review"
      );
    } finally {
      setReviewLoading(false);
    }
  };

  // Render star rating
  const renderStarRating = (
    rating,
    interactive = false,
    onRatingChange = null
  ) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`text-lg ${
            interactive
              ? "cursor-pointer hover:scale-110 transition-transform"
              : "cursor-default"
          } ${
            i <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
          onClick={
            interactive && onRatingChange ? () => onRatingChange(i) : undefined
          }
          disabled={!interactive}
        >
          <FaStar />
        </button>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Open modals
  const openCancelModal = (booking) => {
    // Check if cancellation is allowed
    if (!canCancelBooking(booking.bookingDate)) {
      toast.error(
        "You can't cancel a booking less than 24 hours before the scheduled date"
      );
      return;
    }

    setSelectedBooking(booking);
    setCancelModalOpen(true);
  };

  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setNewDate(booking.bookingDate);
    setUpdateDateModalOpen(true);
  };

  const openReviewModal = (booking, isEdit = false) => {
    setSelectedBooking(booking);
    setIsEditingReview(isEdit);

    if (isEdit && booking.userReview) {
      setExistingReview(booking.userReview);
      setReviewRating(booking.userReview.rating);
      setReviewComment(booking.userReview.comment);
    } else {
      setExistingReview(null);
      setReviewRating(5);
      setReviewComment("");
    }

    setReviewModalOpen(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Please Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to view your bookings.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading your bookings...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Helmet>
        <title>My Bookings - Hotel Nest</title>
        <meta
          name="description"
          content="View and manage your hotel bookings, including cancellation and review options for your stays at Hotel Nest."
        />
        <meta
          name="keywords"
          content="My Bookings, Hotel Nest, Manage Bookings, Hotel Reservations, User Account"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="My Bookings - Hotel Nest" />
        <meta
          property="og:description"
          content="Manage your bookings, update dates, cancel reservations, and share your experiences."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta
          property="og:url"
          content="https://www.hotel-nest.com/my-bookings"
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My <span className="text-blue-600">Bookings</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your hotel reservations, update dates, cancel bookings, and
            share your experiences.
          </p>
        </div>

        {/* Bookings Content */}
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-full">
                  <table className="table w-full table-fixed">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="text-gray-800 dark:text-gray-200 w-1/4">
                          Room
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 w-1/6">
                          Details
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 w-1/6">
                          Date
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 w-1/8">
                          Price
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 w-1/6">
                          Review
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 w-1/6">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => {
                        const canCancel = canCancelBooking(booking.bookingDate);
                        const daysRemaining = getDaysUntilCancellationDeadline(
                          booking.bookingDate
                        );

                        return (
                          <tr
                            key={booking._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="overflow-hidden">
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img
                                      src={
                                        booking.roomImage ||
                                        "https://i.ibb.co/GQzR5BLS/image-not-found.webp"
                                      }
                                      alt={booking.roomName}
                                      onError={(e) => {
                                        e.target.src =
                                          "https://i.ibb.co/GQzR5BLS/image-not-found.webp";
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-gray-800 dark:text-white truncate">
                                    {booking.roomName}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    ID: {booking._id.slice(-6)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="text-sm">
                                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                  <FaUsers className="text-xs" />
                                  <span>
                                    {booking.guests} guest
                                    {booking.guests > 1 ? "s" : ""}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Booked:{" "}
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="font-semibold text-gray-800 dark:text-white">
                                {moment(booking.bookingDate).format(
                                  "MMM Do, YYYY"
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {moment(booking.bookingDate).fromNow()}
                              </div>
                              {!canCancel && (
                                <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                                  <FaClock className="inline mr-1" />
                                  No longer cancellable
                                </div>
                              )}
                              {canCancel && daysRemaining <= 2 && (
                                <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">
                                  <FaClock className="inline mr-1" />
                                  {daysRemaining} day
                                  {daysRemaining !== 1 ? "s" : ""} left to
                                  cancel
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="font-bold text-blue-600">
                                ${Math.round(booking.price)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                per night
                              </div>
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  openReviewModal(booking, booking.hasReviewed)
                                }
                                className={`btn btn-sm ${
                                  booking.hasReviewed
                                    ? "btn-outline text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                                    : "btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                                }`}
                              >
                                <FaStar className="mr-1" />
                                {booking.hasReviewed
                                  ? "Edit Review"
                                  : "Write Review"}
                              </button>
                            </td>
                            <td>
                              <div className="flex items-center gap-1">
                                <div className="tooltip" data-tip="View Room">
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/room-details/${booking.roomId}`
                                      )
                                    }
                                    className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 p-2"
                                  >
                                    <FaEye className="text-xl" />
                                  </button>
                                </div>
                                <div className="tooltip" data-tip="Update Date">
                                  <button
                                    onClick={() => openUpdateModal(booking)}
                                    className="btn btn-ghost btn-xs text-green-600 hover:bg-green-50 dark:hover:bg-green-900 p-2"
                                  >
                                    <FaEdit className="text-xl" />
                                  </button>
                                </div>
                                <div
                                  className="tooltip"
                                  data-tip={canCancel ? "Cancel Booking" : ""}
                                >
                                  <button
                                    onClick={() => openCancelModal(booking)}
                                    className={`btn btn-ghost btn-xs p-2 ${
                                      canCancel
                                        ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                                        : "text-gray-400 dark:text-gray-600"
                                    }`}
                                  >
                                    <FaTrash className="text-xl" />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden grid grid-cols-1 gap-4">
              {bookings.map((booking) => {
                const canCancel = canCancelBooking(booking.bookingDate);
                const daysRemaining = getDaysUntilCancellationDeadline(
                  booking.bookingDate
                );

                return (
                  <div
                    key={booking._id}
                    className="card bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start gap-3 mb-4">
                        <img
                          src={
                            booking.roomImage ||
                            "https://i.ibb.co/GQzR5BLS/image-not-found.webp"
                          }
                          alt={booking.roomName}
                          className="w-16 h-16 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://i.ibb.co/GQzR5BLS/image-not-found.webp";
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 dark:text-white">
                            {booking.roomName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {booking._id.slice(-6)}
                          </p>
                          {!canCancel && (
                            <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                              <FaClock className="inline mr-1" />
                              No longer cancellable
                            </div>
                          )}
                          {canCancel && daysRemaining <= 2 && (
                            <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">
                              <FaClock className="inline mr-1" />
                              {daysRemaining} day
                              {daysRemaining !== 1 ? "s" : ""} to cancel
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">
                            ${Math.round(booking.price)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            per night
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                            <FaCalendarAlt className="text-xs" />
                            <span>Check-in Date</span>
                          </div>
                          <div className="font-semibold text-gray-800 dark:text-white">
                            {moment(booking.bookingDate).format("MMM Do, YYYY")}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {moment(booking.bookingDate).fromNow()}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                            <FaUsers className="text-xs" />
                            <span>Guests</span>
                          </div>
                          <div className="font-semibold text-gray-800 dark:text-white">
                            {booking.guests}
                          </div>
                        </div>
                      </div>

                      {/* Review Button */}
                      <div className="mb-4">
                        <button
                          onClick={() =>
                            openReviewModal(booking, booking.hasReviewed)
                          }
                          className={`btn btn-sm w-full ${
                            booking.hasReviewed
                              ? "btn-outline text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                              : "btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                          }`}
                        >
                          <FaStar className="mr-1" />
                          {booking.hasReviewed ? "Edit Review" : "Write Review"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(`/room-details/${booking.roomId}`)
                          }
                          className="btn btn-sm btn-outline btn-primary flex-1"
                        >
                          <FaEye className="mr-1 text-xl" />
                          View
                        </button>
                        <button
                          onClick={() => openUpdateModal(booking)}
                          className="btn btn-sm btn-outline text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => openCancelModal(booking)}
                          className={`btn btn-sm btn-outline ${
                            canCancel
                              ? "btn-error"
                              : "border-gray-400 text-gray-400 dark:border-gray-600 dark:text-gray-600"
                          }`}
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FaBed className="text-6xl mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't made any room reservations yet.
            </p>
            <button
              onClick={() => navigate("/rooms")}
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
            >
              Browse Rooms
            </button>
          </div>
        )}

        {/* Cancel Booking Modal */}
        {cancelModalOpen && selectedBooking && (
          <div className="modal modal-open">
            <div className="modal-box bg-white dark:bg-gray-800">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                Cancel Booking
              </h3>
              <div className="mb-6">
                <div className="alert alert-warning mb-4">
                  <FaExclamationTriangle />
                  <span>
                    Are you sure you want to cancel this booking? This action
                    cannot be undone.
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {selectedBooking.roomName}
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      Check-in Date:{" "}
                      {moment(selectedBooking.bookingDate).format(
                        "MMMM Do, YYYY"
                      )}
                    </p>
                    <p>Price: ${selectedBooking.price}</p>
                    <p>
                      Cancellation Deadline:{" "}
                      {getCancellationDeadline(selectedBooking.bookingDate)}
                    </p>
                    <p className="text-green-600 dark:text-green-400">
                      <FaCheck className="inline mr-1" />
                      You can cancel this booking
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setCancelModalOpen(false);
                    setSelectedBooking(null);
                  }}
                  className="btn btn-ghost"
                  disabled={cancelLoading}
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  className="btn btn-error"
                  disabled={cancelLoading}
                >
                  {cancelLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaTrash className="mr-2" />
                      Cancel Booking
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Date Modal */}
        {updateDateModalOpen && selectedBooking && (
          <div className="modal modal-open">
            <div className="modal-box bg-white dark:bg-gray-800">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                Update Booking Date
              </h3>
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {selectedBooking.roomName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Date:{" "}
                    {moment(selectedBooking.bookingDate).format(
                      "MMMM Do, YYYY"
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select New Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={getMinDate()}
                    className="input input-bordered w-full text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setUpdateDateModalOpen(false);
                    setSelectedBooking(null);
                    setNewDate("");
                  }}
                  className="btn btn-ghost"
                  disabled={updateLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateDate}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  disabled={
                    updateLoading ||
                    !newDate ||
                    newDate === selectedBooking.bookingDate
                  }
                >
                  {updateLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Update Date
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {reviewModalOpen && selectedBooking && (
          <div className="modal modal-open">
            <div className="modal-box bg-white dark:bg-gray-800 max-w-lg">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">
                {isEditingReview ? "Edit Your Review" : "Write a Review"}
              </h3>
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {selectedBooking.roomName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Stay Date:{" "}
                    {moment(selectedBooking.bookingDate).format(
                      "MMMM Do, YYYY"
                    )}
                  </p>
                  {isEditingReview && existingReview && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Originally reviewed on: {existingReview.date}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name (Read-only)
                    </label>
                    <input
                      type="text"
                      value={user.displayName || user.email}
                      readOnly
                      className="input input-bordered w-full text-base bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating (1-5 stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStarRating(reviewRating, true, setReviewRating)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({reviewRating}/5)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience with this room..."
                      className="textarea textarea-bordered w-full h-24 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <button
                  onClick={() => {
                    setReviewModalOpen(false);
                    setSelectedBooking(null);
                    setReviewRating(5);
                    setReviewComment("");
                    setIsEditingReview(false);
                    setExistingReview(null);
                  }}
                  className="btn btn-ghost"
                  disabled={reviewLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
                  disabled={reviewLoading || !reviewComment.trim()}
                >
                  {reviewLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaStar className="mr-2" />
                      {isEditingReview ? "Update Review" : "Submit Review"}
                    </>
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
