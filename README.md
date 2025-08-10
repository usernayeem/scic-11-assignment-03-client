# Hotel Nest (Client)

## Overview

A modern hotel booking platform designed to help users discover hotels, explore details on an interactive map, and complete secure reservations with a polished, responsive UI.  
This repository contains the client-side React application.

Live Preview:  
https://hotel-nest-1c3c9.web.app/

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technology Used](#technology-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)
- [Contact / Support](#contact--support)

---

## Project Description

Hotel Nest (Client) is a responsive ReactJS web application for discovering and booking hotel rooms. It emphasizes usability, clean navigation, and engaging visuals, providing map-based exploration, detailed hotel views, real-time availability cues, and secure authentication.  
The client integrates Firebase for authentication, Leaflet for mapping, and interacts with client-side or external APIs for content as configured.

---

## Features

- **Modern Responsive Design:** Fully responsive layout powered by Tailwind CSS utility classes.
- **Routing:** Client-side navigation with React Router.
- **Secure Authentication:** Email/password and Google sign-in via Firebase Authentication.
- **Interactive Map:** Explore hotels on a Leaflet map with React Leaflet components.
- **Hotel Discovery:** Browse, search, and filter hotels; view details, amenities, and location.
- **Booking Flow:** Guided booking experience with availability checks and user feedback.
- **Notifications:** Non-blocking toasts for success/error states with React Toastify.
- **Carousel:** Showcase featured hotels or promotions using React Slick + Slick Carousel.
- **SEO & Metadata:** Manage page titles and meta tags with React Helmet.
- **Accessibility:** Focus states and semantic markup considerations.
- **Security Best Practices:** Sensitive keys (Firebase, etc.) are secured with environment variables.

---

## Technology Used

- **React** — Frontend library for building user interfaces
- **React Router DOM** — Declarative routing for React applications
- **Firebase Authentication** — Email/Password and Google sign-in
- **Axios/Fetch** — HTTP requests to the backend API
- **Leaflet & React Leaflet** — Interactive maps and geospatial visualization
- **Tailwind CSS** — Utility-first styling with @tailwindcss/vite for Vite
- **DaisyUI** — Component and theme utilities for Tailwind
- **React Toastify** — Non-blocking notifications
- **React Slick + Slick Carousel** — Carousels/sliders for featured content
- **React Helmet** — SEO and document head management
- **Moment.js** — Date/time formatting for bookings and availability
- **Vite** — Fast development server and build tooling

---

## Installation

### Prerequisites

- [Git](https://git-scm.com/) (to clone the repository)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for dependency management)
- A modern web browser (Chrome, Edge, Firefox, Safari, etc.)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/usernayeem/hotel-nest.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hotel-nest
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create and configure environment variables (see Configuration).

5. Run locally:
   ```bash
   npm run dev
   ```
   The development server will start and the app will be available at `http://localhost:5173`.

---

## Usage

- **Sign In / Sign Up:** Authenticate via Email/Password or Google to access booking features.
- **Browse Hotels:** Explore listings; use search and filters to narrow results.
- **Map View:** Use the interactive map to locate hotels and view proximity to points of interest.
- **View Details:** Open a hotel’s detail page for photos, amenities, pricing, and availability.
- **Book a Room:** Follow the booking flow and confirm reservations; receive feedback via toasts.
- **Manage Session:** Stay signed in to view recent activity and streamline bookings.

Tips:

- Look for toast notifications confirming actions like login, booking, and profile updates.
- Use the navigation bar to move between pages (home, map, hotels, profile, etc.).

---

## Configuration

Create a `.env` file in the project root with the following environment variables. Replace placeholder values with your own:

```env
VITE_API_BASE_URL=https://your-api.example.com

# Firebase (required for authentication)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**Styling:**

- Tailwind CSS is configured via the Vite plugin (`@tailwindcss/vite`) and Tailwind v4.
- DaisyUI can be enabled/configured through your Tailwind setup for themes and components.

---

## Testing

- **Automated Testing:**  
  The project can use Jest and React Testing Library for unit and component testing (if configured).

- **Run Tests:**

  ```bash
  npm test
  ```

- **For manual testing:**
  - Open the app in different browsers and devices.
  - Test authentication flows (email/password, Google).
  - Verify hotel search, filter, and detail views.
  - Interact with the map and confirm markers/tiles load as expected.
  - Walk through a booking flow and confirm feedback via toasts.
  - Check responsiveness on various screen sizes.
  - Verify routing and any protected views.
  - Test keyboard navigation and basic accessibility (focus states, ARIA where applicable).

---

## License

This project is licensed under the [MIT](LICENSE) License.
