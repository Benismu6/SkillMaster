# SkillMaster Frontend

Welcome to the frontend of **SkillMaster**, a platform designed to connect skill seekers and providers. This project provides an intuitive user interface for users to browse, learn, and share skills efficiently.

## Table of Contents
- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Installation and Setup](#installation-and-setup)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Available Scripts](#available-scripts)

---

## Overview

The frontend is built using **React** to deliver a modern and responsive user experience. It integrates seamlessly with the backend API to provide functionalities such as user authentication, skill browsing, and service management.

---

## Directory Structure

```
frontend/
├── public/
│   ├── index.html
│   └── assets/
│       ├── css/           # Stylesheets
│       ├── images/        # Static images
│       └── fonts/         # Custom fonts
├── src/
│   ├── components/        # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/             # Individual page components (e.g., Home, Login, Sign Up)
│   ├── styles/            # CSS Modules for styling
│   ├── App.js             # Main application component
│   ├── index.js           # React entry point
│   ├── index.css          # Global styles
│   └── README.md          # Documentation (this file)
```

## Installation and Setup

To set up the frontend locally, follow these steps:

### Clone the repository:
```
git clone https://github.com/Benismu6/SkillMaster/tree/benisbranch
cd frontend
```

### Install dependencies:
Ensure you have Node.js and npm installed, then run:


### Install dependencies:
Ensure you have Node.js and npm installed, then run:

```
npm install
```

### Start the development server:

```
npm start
```

Open your browser and navigate to `http://localhost:3000`.

---

## Features

### Pages
- **Home**: Introduction to the platform and a gateway to explore skills.
- **Skills Dashboard**: Browse available skills by categories or all skills.
- **Sign Up/Login**: Create an account or log in as a skill seeker or provider.
- **Settings**: Manage account settings for both seekers and providers.
- **Community Page**: Engage with other users and participate in discussions.

### Components
- **Navbar**: Minimal and full versions for navigation across the platform.
- **Footer**: Provides quick links and subscription options.
- **Responsive Design**: Ensures usability across all device sizes.

### Styling
- **Theme colors**:
  - Primary: `#4CAF50` (Green)
  - Secondary: `#FF7043` (Orange)
  - Neutral: `#2C3E50` (Dark Grey)
- Clean and modern design using CSS modules.

---

## Tech Stack

### Frontend
- **React**: Component-based architecture for building dynamic UIs.
- **CSS Modules**: Scoped styling for components.
- **HTML5 & CSS3**: Standard web technologies for structure and styling.

### State Management
- Local component states; no external state library (e.g., Redux) is currently in use.
