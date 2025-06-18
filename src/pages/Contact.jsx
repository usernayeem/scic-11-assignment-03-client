import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../contexts/ToastContext";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
  IoSendOutline,
  IoChatbubbleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Helmet } from "react-helmet";

export const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/contact`,
        formData
      );

      if (response.status === 201) {
        toast.success(
          "Message sent successfully! We'll get back to you within 24 hours."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "general",
        });
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: IoLocationOutline,
      title: "Visit Us",
      details: ["123 Hotel Street, City Center", "New York, NY 10001"],
      action: "Get Directions",
      link: "https://www.google.com/maps",
    },
    {
      icon: IoCallOutline,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Toll-free: 1-800-HOTEL"],
      action: "Call Now",
      link: "tel:+15551234567",
    },
    {
      icon: IoMailOutline,
      title: "Email Us",
      details: ["info@hotelnest.com", "reservations@hotelnest.com"],
      action: "Send Email",
      link: "mailto:info@hotelnest.com",
    },
    {
      icon: IoTimeOutline,
      title: "Business Hours",
      details: ["Front Desk: 24/7", "Concierge: 6 AM - 11 PM"],
      action: "View Details",
      link: "#hours",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "reservation", label: "Reservation" },
    { value: "events", label: "Events & Meetings" },
    { value: "feedback", label: "Feedback" },
    { value: "support", label: "Support" },
  ];

  return (
    <div className="w-full py-16 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Contact Us - Hotel Nest</title>
        <meta
          name="description"
          content="Get in touch with Hotel Nest for inquiries, reservations, and feedback. We're here to assist you."
        />
        <meta
          name="keywords"
          content="Contact, Hotel Nest, Inquiries, Customer Support, Reservations"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="Contact Us - Hotel Nest" />
        <meta
          property="og:description"
          content="Have questions? Reach out to our dedicated team for assistance."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="https://www.hotel-nest.com/contact" />
      </Helmet>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-200">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or need assistance? Our dedicated team is here to
            help make your stay exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg shadow-lg p-8 transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <IoChatbubbleOutline className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                  Send us a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                {/* Phone and Inquiry Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      Phone Number{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Subject <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                    placeholder="Brief subject of your message"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400 resize-none"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <IoSendOutline className="mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="rounded-lg shadow-lg p-6 transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                    <info.icon className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-gray-200 mb-2">
                      {info.title}
                    </h4>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : "_self"}
                      rel={
                        info.link.startsWith("http")
                          ? "noopener noreferrer"
                          : ""
                      }
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                    >
                      {info.action} →
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Media */}
            <div className="rounded-lg shadow-lg p-6 transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-gray-200 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="p-3 rounded-full transition-colors duration-200 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white dark:bg-gray-700 dark:text-gray-400"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full transition-colors duration-200 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white dark:bg-gray-700 dark:text-gray-400"
                >
                  <FaTwitter className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full transition-colors duration-200 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white dark:bg-gray-700 dark:text-gray-400"
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full transition-colors duration-200 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white dark:bg-gray-700 dark:text-gray-400"
                >
                  <FaLinkedinIn className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="text-center rounded-lg p-8 transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2">
            Response Time
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            We typically respond to all inquiries within{" "}
            <strong>2-4 hours</strong> during business hours, and within{" "}
            <strong>24 hours</strong> on weekends and holidays.
          </p>
        </div>
      </div>
    </div>
  );
};
