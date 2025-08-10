import React from "react";
import { Link } from "react-router-dom";
import {
  IoWifiOutline,
  IoCarOutline,
  IoRestaurantOutline,
  IoFitnessOutline,
  IoWaterOutline,
  IoCafeOutline,
  IoBusinessOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoLeafOutline,
  IoCarSportOutline,
  IoGameControllerOutline,
} from "react-icons/io5";

export const HotelAmenities = () => {
  const mainAmenities = [
    {
      id: 1,
      title: "Luxury Spa & Wellness",
      description:
        "Rejuvenate your body and mind with our full-service spa featuring massage therapy, sauna, and wellness treatments.",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: IoLeafOutline,
      features: [
        "Massage Therapy",
        "Sauna & Steam",
        "Yoga Classes",
        "Beauty Treatments",
      ],
    },
    {
      id: 2,
      title: "Fine Dining Restaurant",
      description:
        "Experience culinary excellence with our award-winning restaurant featuring international cuisine and local specialties.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: IoRestaurantOutline,
      features: [
        "Gourmet Cuisine",
        "Wine Selection",
        "Private Dining",
        "Room Service",
      ],
    },
    {
      id: 3,
      title: "Infinity Pool & Deck",
      description:
        "Relax by our stunning infinity pool with panoramic city views, complete with poolside service and comfortable lounging areas.",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      icon: IoWaterOutline,
      features: ["Infinity Pool", "Pool Bar", "Sun Loungers", "City Views"],
    },
  ];

  const allAmenities = [
    {
      icon: IoWifiOutline,
      name: "Free WiFi",
      description: "High-speed internet throughout",
    },
    {
      icon: IoCarOutline,
      name: "Valet Parking",
      description: "Complimentary parking service",
    },
    {
      icon: IoFitnessOutline,
      name: "Fitness Center",
      description: "24/7 modern gym facilities",
    },
    {
      icon: IoCafeOutline,
      name: "Coffee Lounge",
      description: "Premium coffee & pastries",
    },
    {
      icon: IoBusinessOutline,
      name: "Business Center",
      description: "Meeting rooms & services",
    },
    {
      icon: IoShieldCheckmarkOutline,
      name: "24/7 Security",
      description: "Round-the-clock safety",
    },
    {
      icon: IoTimeOutline,
      name: "Concierge",
      description: "Personal assistance services",
    },
    {
      icon: IoCarSportOutline,
      name: "Airport Shuttle",
      description: "Complimentary transfers",
    },
    {
      icon: IoGameControllerOutline,
      name: "Entertainment",
      description: "Gaming & recreation area",
    },
  ];

  return (
    <div className="w-full py-16 transition-colors duration-200 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-200">
            World-Class Amenities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Indulge in luxury with our comprehensive range of amenities and
            services designed to exceed your expectations.
          </p>
        </div>

        {/* All Amenities Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-200">
            Complete Amenities List
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg transition-all duration-200 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 dark:bg-gray-800 dark:hover:bg-blue-900/10 dark:border-gray-700 dark:hover:border-blue-700 shadow-lg"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <amenity.icon className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-1">
                    {amenity.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Stats */}
        <div className="rounded-lg p-8 mb-12 transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Premium Services
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Concierge Support
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">5★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Service Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Guest Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center rounded-lg p-8 transition-colors duration-200 bg-blue-600 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Experience Luxury?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Book your stay today and enjoy access to all our premium amenities
            and world-class services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rooms"
              className="btn bg-white text-blue-600 hover:bg-gray-100 border-white hover:border-gray-100 px-8 py-3 font-semibold transition-colors duration-200"
            >
              Book Your Stay
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 font-semibold transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
