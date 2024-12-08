# Crowdcube: A Crowdfunding Application

Crowdcube is a crowdfunding platform that allows users to raise funds for
various purposes such as startups, personal issues, creative ideas, and
business-related projects. The application connects campaign creators with
potential donors, fostering a community-driven approach to fundraising.

## Live Site

[Visit Crowdcube](https://assignment-10-10e8f.web.app/)

## Features

- **Dynamic Campaign Management**:
  - Users can add, update, and delete their campaigns.
  - Campaigns are categorized as _Startup_, _Personal Issue_, _Creative Idea_,
    or _Business Related_.
- **Protected Routes**:
  - Key functionalities like adding campaigns, viewing donations, and editing
    campaigns are secured through private routes.
- **Donation System**:
  - A seamless donation process with real-time updates stored in the database.
  - Prevent donations to expired campaigns with custom alerts.
- **Responsive Design**:
  - Fully optimized for mobile, tablet, and desktop views with a user-friendly
    interface.
- **Authentication**:
  - Email/password-based login and registration with Google login integration.
  - Conditional navbar buttons based on login status, displaying user details
    when logged in.
- **Data Visualization**:
  - Running campaigns are displayed in card format with a "See More" button for
    detailed views.
  - All campaigns and donations are presented in tables or cards for clear
    navigation.

## Highlights

- **Customizable Campaign Cards**: View 6 active campaigns on the homepage with
  options to explore further.
- **Interactive UI**:
  - Implemented sliders, carousels, and animations using React Awesome Reveal
    and other libraries.
  - Optional dark/light theme toggle for enhanced accessibility.
- **Sorting and Filtering**:
  - Sort campaigns on the "All Campaigns" page by minimum donation amount.
- **Loading Spinner**: Ensures smooth transitions while data is being fetched.

## Key Routes

1. **Home Page**:
   - Includes a banner, running campaigns section, and two additional meaningful
     sections.
2. **Campaign Management**:
   - Add New Campaign: Create campaigns with essential details.
   - My Campaigns: Manage your campaigns with options to update or delete.
   - All Campaigns: View all campaigns with sorting options.
3. **Details Page**:
   - View comprehensive details of each campaign.
   - Donate to active campaigns or view expiration notices.
4. **My Donations**:
   - Track all donations made by the user.

## Additional Features

- **404 Page**: Custom "Page Not Found" for undefined routes.
- **Environment Variables**: Firebase and MongoDB credentials are securely
  hidden.
- **Lottie Animations**: Engaging animations for a polished look.
- **Tooltips**: Enhanced user interaction with React-tooltip.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Hosting**:
  - Client: Firebase
  - Server: Vercel

## Deployment

- Deployed with proper Firebase domain authorization for a secure and functional
  environment.

## GitHub Commit Standards

- **Client-Side**: Minimum 15 meaningful commits.
- **Server-Side**: Minimum 8 meaningful commits.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crowdcube-client.git
   git clone https://github.com/your-username/crowdcube-server.git
   ```
