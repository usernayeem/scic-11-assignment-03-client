import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { LuHotel } from "react-icons/lu";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom hotel icon
const hotelIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb" width="32" height="32">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Hotel location coordinates (New York City example)
  const hotelLocation = {
    lat: 40.7589,
    lng: -73.9851,
    name: "HotelNest Premium",
    address: "123 Hotel Street, City Center, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@hotelnest.com",
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div className="w-full py-16 transition-colors duration-200 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Find Us <span className="text-blue-600">Here</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Located in the heart of the city, our hotel offers easy access to
            major attractions and business districts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              {!mapLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center z-10">
                  <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-blue-600"></span>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Loading map...
                    </p>
                  </div>
                </div>
              )}

              <MapContainer
                center={[hotelLocation.lat, hotelLocation.lng]}
                zoom={15}
                style={{ height: "400px", width: "100%" }}
                whenReady={handleMapLoad}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[hotelLocation.lat, hotelLocation.lng]}
                  icon={hotelIcon}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <LuHotel className="text-blue-600 text-lg" />
                        <h3 className="font-bold text-gray-900">
                          {hotelLocation.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {hotelLocation.address}
                      </p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <IoCallOutline />
                          <span>{hotelLocation.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IoMailOutline />
                          <span>{hotelLocation.email}</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Hotel Information Card */}
          <div className="lg:col-span-1">
            <div className="rounded-lg shadow-lg p-6 h-full transition-colors duration-200 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <LuHotel className="text-blue-600 dark:text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                  {hotelLocation.name}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <IoLocationOutline className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {hotelLocation.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <IoCallOutline className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-1">
                      Phone
                    </h4>
                    <a
                      href={`tel:${hotelLocation.phone}`}
                      className="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
                    >
                      {hotelLocation.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <IoMailOutline className="text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-200 mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${hotelLocation.email}`}
                      className="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
                    >
                      {hotelLocation.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hotelLocation.lat},${hotelLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 text-white w-full transition-colors duration-200"
                >
                  Get Directions
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-blue-600 dark:text-blue-200">
                  <strong>Transportation:</strong> 2 minutes walk to subway
                  station, 15 minutes to airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for popup styling */}
      <style jsx>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  );
};
