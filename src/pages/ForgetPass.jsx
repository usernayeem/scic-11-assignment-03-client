import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "../contexts/ToastContext";
import { LuHotel } from "react-icons/lu";
import { Helmet } from "react-helmet";

export const ForgetPass = () => {
  const toast = useToast();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (error) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email address.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-200 bg-gradient-to-br from-blue-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-900">
      <Helmet>
        <title>Password Reset - Hotel Nest</title>
        <meta
          name="description"
          content="Reset your password by entering your email address. We'll send you a link to create a new password."
        />
        <meta
          name="keywords"
          content="Password Reset, Forgot Password, User Account, Hotel Nest"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="Password Reset - Hotel Nest" />
        <meta
          property="og:description"
          content="Forgot your password? Enter your email to receive a reset link."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta
          property="og:url"
          content="https://www.hotel-nest.com/forget-password"
        />
      </Helmet>
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-200">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {/* Reset Password Form */}
        <div className="p-8 rounded-lg shadow-lg transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handlePasswordReset} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Sending Reset Email...
                </span>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  Remember your password?
                </span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="w-full btn btn-outline bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white py-3 text-base"
            >
              Back to Login
            </Link>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors duration-200"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
