import { createBrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import MainLayout from '../components/MainLayout/MainLayout';
import MainLayout from '../components/MainLayouts/MainLayouts';
import Home from '../components/Home/Home';
import Campaign from '../components/Campaign/Campaign';
// import Dashboard from '../components/Dashboard/Dashboard';

// import Details from '../components/Details/Details';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
// import Private from '../components/Private/Private';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import AddCampaign from '../components/AddCampaign/AddCampaign';

import Private from '../components/Private/Private';
import MyDonation from '../components/MyDonation/MyDonation';
import MyCampaign from '../components/myCampaign/myCampaign';
// import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
// import HowToHelp from '../components/HowToHelp/HowToHelp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Helmet>
              <title>Home || Crowd Cube</title>
            </Helmet>
            <Home />
          </>
        ),
        loader: async () => {
          const campaignsRes = await fetch('http://localhost:8000/campaigns');
          const campaignsData = await campaignsRes.json();
          return { campaignsData };
        },
      },
      {
        path: '/campaigns',
        element: (
          <>
            <Helmet>
              <title>Campaigns || Crowd Cube</title>
            </Helmet>
            <Campaign />
          </>
        ),
        loader: async () => {
          // Fetch user data to pre-fill the form
          const campaignRes = await fetch('http://localhost:8000/campaigns');
          const campaignData = await campaignRes.json();
          return campaignData;
        },
      },
      // {
      //   path: '/dashboard',
      //   element: (
      //     <Private>
      //       <>
      //         <Helmet>
      //           <title>Dashboard || Winter Clothing Donation</title>
      //         </Helmet>
      //         <Dashboard />
      //       </>
      //     </Private>
      //   ),
      // },
      // {
      //   path: '/help',
      //   element: (
      //     <>
      //       <Helmet>
      //         <title>help || Winter Clothing Donation</title>
      //       </Helmet>
      //       <HowToHelp />
      //     </>
      //   ),
      // },
      // {
      //   path: '/details/:id',
      //   element: (
      //     <Private>
      //       <>
      //         <Helmet>
      //           <title>Campaign Details || Winter Clothing Donation</title>
      //         </Helmet>
      //         <Details />
      //       </>
      //     </Private>
      //   ),
      //   loader: async ({ params }) => {
      //     const res = await fetch('/campaign.json');
      //     const data = await res.json();
      //     const singleData = data.find(d => d.id == params.id);
      //     return singleData;
      //   },
      // },
      {
        path: '/addCampaign',
        element: (
          <>
            <Private>
              <Helmet>
                <title>Add Campaign || Crowd cube</title>
              </Helmet>
              <AddCampaign />
            </Private>
          </>
        ),
      },
      {
        path: '/myCampaign',
        element: (
          <>
            <Private>
              <Helmet>
                <title>My Campaign || Crowd cube</title>
              </Helmet>
              <MyCampaign />
            </Private>
          </>
        ),
      },
      {
        path: '/myDonations',
        element: (
          <>
            <Private>
              <Helmet>
                <title>My Donation || Crowd cube</title>
              </Helmet>
              <MyDonation />
            </Private>
          </>
        ),
      },
      {
        path: '/login',
        element: (
          <>
            <Helmet>
              <title>Login || Winter Clothing Donation</title>
            </Helmet>
            <Login />
          </>
        ),
      },
      {
        path: '/register',
        element: (
          <>
            <Helmet>
              <title>Register || Winter Clothing Donation</title>
            </Helmet>
            <Register />
          </>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <>
            <Helmet>
              <title>Forgot Password || Winter Clothing Donation</title>
            </Helmet>
            <ForgotPassword />
          </>
        ),
      },
    ],
  },
]);

export default router;
