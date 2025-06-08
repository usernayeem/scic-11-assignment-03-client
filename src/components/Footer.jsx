import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { LuHotel } from "react-icons/lu";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";

export const Footer = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="transition-colors duration-200 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-0 text-xl font-bold">
              <LuHotel className="text-blue-600" />
              <span className="font-bold text-blue-600">Hotel</span>
              <span className="font-light ml-1">Nest</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Discover exceptional accommodations and create unforgettable
              experiences. Your perfect stay is just a booking away.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full transition-colors duration-200 bg-white hover:bg-blue-600 text-gray-600 hover:text-white shadow-sm dark:bg-gray-800 dark:text-gray-400"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-colors duration-200 bg-white hover:bg-blue-600 text-gray-600 hover:text-white shadow-sm dark:bg-gray-800 dark:text-gray-400"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-colors duration-200 bg-white hover:bg-blue-600 text-gray-600 hover:text-white shadow-sm dark:bg-gray-800 dark:text-gray-400"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full transition-colors duration-200 bg-white hover:bg-blue-600 text-gray-600 hover:text-white shadow-sm dark:bg-gray-800 dark:text-gray-400"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <IoLocationOutline className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  123 Hotel Street, City Center
                  <br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <IoCallOutline className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <IoMailOutline className="text-blue-600 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  info@hotelnest.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t transition-colors duration-200 border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} HotelNest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm hover:text-blue-600 transition-colors duration-200 text-gray-600 dark:text-gray-400"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
