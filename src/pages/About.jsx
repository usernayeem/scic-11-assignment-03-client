import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaHotel,
  FaStar,
  FaUsers,
  FaAward,
  FaHeart,
  FaGlobeAmericas,
  FaLeaf,
  FaShieldAlt,
  FaUserTie,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoTrophyOutline,
  IoStarOutline,
} from "react-icons/io5";

export const About = () => {
  const stats = [
    { icon: FaHotel, number: "15+", label: "Years of Excellence" },
    { icon: FaUsers, number: "50K+", label: "Happy Guests" },
    { icon: FaStar, number: "4.9", label: "Average Rating" },
    { icon: FaAward, number: "25+", label: "Awards Won" },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Exceptional Service",
      description:
        "We believe in going above and beyond to create memorable experiences for every guest who stays with us.",
    },
    {
      icon: FaGlobeAmericas,
      title: "Global Standards",
      description:
        "Our commitment to international hospitality standards ensures consistent quality and comfort worldwide.",
    },
    {
      icon: FaLeaf,
      title: "Sustainability",
      description:
        "We're dedicated to eco-friendly practices and sustainable tourism to protect our beautiful environment.",
    },
    {
      icon: FaShieldAlt,
      title: "Safety First",
      description:
        "Your safety and security are our top priorities, with 24/7 monitoring and safety protocols in place.",
    },
  ];

  const milestones = [
    {
      year: "2008",
      title: "Hotel Nest Founded",
      description: "Started as a boutique hotel with a vision for excellence.",
    },
    {
      year: "2012",
      title: "First Award",
      description: "Received 'Best New Hotel' award from Travel Excellence.",
    },
    {
      year: "2016",
      title: "Expansion Complete",
      description: "Added luxury spa and conference facilities.",
    },
    {
      year: "2020",
      title: "Sustainability Certified",
      description: "Achieved Green Hospitality certification.",
    },
    {
      year: "2024",
      title: "Digital Innovation",
      description: "Launched modern booking platform and smart room features.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Helmet>
        <title>About Us - Hotel Nest</title>
        <meta
          name="description"
          content="Learn about Hotel Nest's story, mission, and the dedicated team that makes your stay exceptional. Discover our commitment to excellence and sustainability."
        />
        <meta
          name="keywords"
          content="About Hotel Nest, Hotel Story, Our Team, Mission, Values, Awards, Hospitality Excellence"
        />
        <meta name="author" content="Hotel Nest Team" />
        <meta property="og:title" content="About Us - Hotel Nest" />
        <meta
          property="og:description"
          content="Discover the story behind Hotel Nest and meet the team dedicated to providing exceptional hospitality experiences."
        />
        <meta property="og:image" content="URL_to_image" />
        <meta property="og:url" content="https://www.hotel-nest.com/about" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About <span className="text-blue-600">Hotel Nest</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Where exceptional hospitality meets modern comfort. Since 2008,
            we've been creating unforgettable experiences for travelers from
            around the world.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Hotel Nest Exterior"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://i.ibb.co/GQzR5BLS/image-not-found.webp";
                }}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Our Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Hotel Nest began as a dream to create a place where travelers
                could experience the perfect blend of luxury, comfort, and
                genuine hospitality. Founded in 2008 by a team of hospitality
                veterans, we set out to redefine what it means to feel at home
                while away from home.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we continue to uphold our founding principles while
                embracing innovation and sustainability. Every detail of your
                stay is carefully crafted to exceed expectations and create
                lasting memories.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Our Numbers Tell Our Story
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                  <stat.icon className="text-blue-600 text-xl" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <value.icon className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0
                        ? "text-right md:pr-8"
                        : "text-left md:pl-8"
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <IoCalendarOutline className="text-blue-600" />
                        <span className="font-bold text-blue-600">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Experience Hotel Nest?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have made Hotel Nest their
            home away from home. Book your stay today and discover what makes us
            special.
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
