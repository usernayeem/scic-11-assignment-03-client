import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { LuHotel } from "react-icons/lu";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { updateProfile } from "firebase/auth";

export const Register = () => {
  const { registerUser, googleAuth } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    return hasUppercase && hasLowercase && hasMinLength;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const userCredential = await registerUser(
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      toast.success("Registration successful! Welcome to HotelNest.");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      await googleAuth();
      toast.success("Google registration successful! Welcome to HotelNest.");
      navigate("/");
    } catch (error) {
      toast.error("Google registration failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const isPasswordValid = validatePassword(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-200 bg-gradient-to-br from-blue-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-900">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-200">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join us and start your amazing journey
          </p>
        </div>

        {/* Registration Form */}
        <div className="p-8 rounded-lg shadow-lg transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Photo URL <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                value={formData.photoURL}
                onChange={handleInputChange}
                className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                placeholder="https://example.com/your-photo.jpg"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 pr-10 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="text-xl" />
                  ) : (
                    <IoEyeOutline className="text-xl" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="space-y-1">
                    <div
                      className={`flex items-center ${
                        formData.password.length >= 6
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-red-500"
                      }`}
                    >
                      • At least 6 characters
                    </div>
                    <div
                      className={`flex items-center ${
                        /[A-Z]/.test(formData.password)
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-red-500"
                      }`}
                    >
                      • One uppercase letter
                    </div>
                    <div
                      className={`flex items-center ${
                        /[a-z]/.test(formData.password)
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-red-500"
                      }`}
                    >
                      • One lowercase letter
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading || (formData.password && !isPasswordValid)}
              className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
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
                  Or register with
                </span>
              </div>
            </div>
          </div>

          {/* Google Register Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading}
            className="w-full mt-4 btn bg-white text-black border-[#e5e5e5] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-base font-medium dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
          >
            {googleLoading ? (
              <span className="flex items-center justify-center">
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Connecting...
              </span>
            ) : (
              <>
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mr-3 rounded-full"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors duration-200"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
